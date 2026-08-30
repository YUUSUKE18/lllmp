package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// 1行目: 目標値の読み込み
	if !scanner.Scan() {
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値の読み込みに失敗した場合は終了
		return
	}

	// 2行目以降: 数値の読み込み
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
		// 空行や不正な行は無視される
	}

	// 2個の組の数を求める
	count := 0
	n := len(numbers)

	// O(N^2) の全ペアチェック (Nが最大でも数百万程度と仮定すれば許容範囲)
	// 与えられた制約が「敵対的に大きな入力」という点に注意が必要だが、
	// 入力の行数Nが非常に大きい場合、O(N^2) は間に合わない。
	// しかし、問題文の制約（「2行目以降の整数のうち、足して目標値になる2個の組」）から、
	// 実際に入力される整数の個数Nが実用的な範囲（例えば10^5程度）であれば、
	// O(N^2) は間に合わない可能性がある。
	// したがって、ハッシュマップまたはソートを利用したO(N log N) または O(N) のアプローチを検討する。

	// O(N) のアプローチ: ハッシュマップ (または配列) を使用
	// ターゲット値から求めたい値 (target - x) が既に現れたかどうかをチェックする。
	// ここでは、与えられた数列から任意の2つの要素の和がターゲットになるペアの数を数える。
	// これは典型的な「2Sum」問題の変種であり、位置が異なるペアを数える必要がある。

	// ターゲット値から、各要素の「補数」を求める。
	// ターゲット = numbers[i] + numbers[j] (i != j)
	// numbers[j] = target - numbers[i]

	// ターゲット値と、各要素の出現回数をマッピングする。
	// ターゲット値そのものに焦点を当てるのではなく、ペアの数を数える。

	// 2Sumの標準的な解法（ハッシュマップ）を適用する。
	// ターゲット値が固定されているため、各要素 i について、target - numbers[i] が
	// どこかに存在するかをチェックする。

	// ターゲット値と、各要素の出現回数を格納するマップ
	// key: 数値, value: その値が出現した回数
	freq := make(map[int64]int64)
	for _, num := range numbers {
		freq[num]++
	}

	totalPairs := int64(0)

	// 各要素 i について、target - numbers[i] を探す
	for i := 0; i < n; i++ {
		numI := numbers[i]
		complement := target - numI

		// 補数がマップに存在するかチェック
		if countVal, found := freq[complement]; found {
			// 1. numI と complement が異なる場合 (numI != complement)
			if numI != complement {
				// numI と complement のペアを数える。
				// numI が i 番目の要素である。complement が存在する。
				// 既に numI が出現した回数 (freq[numI]) と、complement が出現した回数 (countVal) を掛ける。
				// この方法だと重複カウントや自己ペア (i=j) の扱いが複雑になるため、
				// 集合的なペアの数を数える方が安全。

				// ターゲット値が固定されているため、
				// ターゲット = a + b となるペア (a, b) を数える。
				// a と b が異なる場合、a の出現回数 * b の出現回数 がペアの数になる。
				// ただし、ここでは「位置が異なる2個の組」を数えるため、
				// ターゲット値が固定されているため、より単純な方法が望ましい。
			} else {
				// 2. numI と complement が等しい場合 (numI == complement)
				// 2 * numI = target
				// この場合、numbers[i] と numbers[j] (i != j) のペアを数える。
				// numbers[i] が k 個存在する場合、組み合わせの数は k * (k - 1) / 2。
				// ここで、numbers[i] が target/2 である場合のみカウントする。
				if numI*2 == target {
					// numbers[i] が target/2 となる要素の総数を数える
					k := freq[numI]
					// 組み合わせの数: k C 2
					totalPairs += k * (k - 1) / 2
				}
			}
		}
	}

	// 最初のO(N^2)アプローチに戻り、制約を再評価する。
	// 「2行目以降の整数のうち、足して目標値になる2個の組（位置が異なる2個）の個数」
	// Nが非常に大きい場合、O(N^2)は不可。
	// したがって、O(N)またはO(N log N)が必須。

	// O(N)で、位置が異なるペアを数える方法（2Sumの拡張）
	// 1. 全ての要素をソートする (O(N log N))
	// 2. 2ポインタ法でペアを数える (O(N))

	// データを元のインデックス情報とセットで保持する
	type NumberInfo struct {
		Value int64
		Index int
	}
	var info []NumberInfo
	for i, num := range numbers {
		info = append(info, NumberInfo{Value: num, Index: i})
	}

	// ソート (Valueに基づいて)
	// 安定性を保つため、インデックスも保持してソートする。
	// 2Sumで位置が異なるペアを数えるため、元のインデックスは必須ではないが、
	// どの要素がどの値に対応するかを把握するために役立つ。
	// ここでは、値のみをソートし、重複を考慮する。
	// ターゲット値が固定されているため、単純にソートして2ポインタ法を用いる。

	// ソート
	// ターゲット値との差を考えるため、元の順序を保持したままソートする。
	// 2Sumで位置が異なるペアを数える場合、元のインデックスを保持したままソートする必要がある。
	// ただし、問題は「与えられた数列」の要素間のペアなので、要素の順序は意味をなさない。
	// したがって、値の集合として扱うのが最も効率的。

	// 最終的なO(N)またはO(N log N)の解法として、ハッシュマップによる2Sumの拡張を再実行する。
	// ターゲット値が固定されているため、各要素 i について、target - numbers[i] が存在するかをチェックする。
	// この方法で、重複した値のペアを正しくカウントする。

	// ターゲット = a + b (a != b) のペアを数える
	// ターゲット = a + a (a = b) のペアを数える

	// 1. 各値の出現回数を集計 (既に freq にある)
	// 2. ターゲット値が偶数で、 target/2 が存在する値 (a=b のケース)
	// 3. ターゲット値が奇数、 target - a = b (a!=b のケース)

	finalCount := int64(0)

	// ターゲット値が偶数で、 target/2 と同じ値のペアを数える (a=b のケース)
	if target%2 == 0 {
		halfTarget := target / 2
		if countVal, found := freq[halfTarget]; found {
			// halfTarget と同じ値が k 個ある場合、k C 2 のペア
			finalCount += countVal * (countVal - 1) / 2
		}
	}

	// ターゲット値が奇数、 target - a = b のペアを数える (a!=b のケース)
	// ターゲット値が奇数の場合、a != b のペアのみを数える。
	// a と b が異なる場合、a の出現回数 * b の出現回数 がペアの数になる。
	// ここで、a と b の組を重複なく数える必要がある。

	// 全てのユニークな値のリストを取得
	uniqueValues := make([]int64, 0, len(freq))
	for val := range freq {
		uniqueValues = append(uniqueValues, val)
	}
	// ユニークな値をソートして、重複なくペアを数える
	// O(U log U) + O(U^2) または O(U log U)
	// U <= N なので、O(N log N)で十分。

	// ターゲット値が奇数の場合、a != b のペアを数える
	for i := 0; i < len(uniqueValues); i++ {
		a := uniqueValues[i]
		b := target - a

		// a と b が異なるかチェック
		if a != b {
			// b が存在するかチェック
			if _, found := freq[b]; found {
				// a と b のペアを数える。
				// a の出現回数 * b の出現回数
				// このカウントは (a, b) のペアと (b, a) のペアを重複して数えることになるため、
				// i < j の制約を適用する必要がある。

				// 集合的なペアの数を数えるため、a < b の順にチェックする。
				if a < b {
					finalCount += freq[a] * freq[b]
				}
			}
		}
	}

	// 最終的な結果を出力
	fmt.Printf("pairs=%d\n", finalCount)
}
