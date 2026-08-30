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
		// 整数として解釈できない行は無視される
	}

	// 2個の組の数を計算
	count := 0
	n := len(numbers)

	// O(N^2) の全探索で解く (Nが十分に小さければ許容されるが、敵対的な大きな入力に対応するため、より効率的な方法を検討する)
	// 仕様上、Nが非常に大きい場合、O(N^2) は間に合わない可能性があるため、ハッシュマップ/ソートによるO(N log N)またはO(N)を目指す。

	// ここでは、2つの要素 a[i] + a[j] = target を探す問題なので、
	// 2つの要素を固定して残りの要素を探す、またはソートして2ポインタ法/ハッシュマップを使うのが定石。

	// O(N^2) の全探索（最も単純だが、制約によってはTLEのリスクがある）
	// 競技プログラミングの文脈では、Nが10^5程度ならO(N^2)は不可。Nが10^3程度なら許容される。
	// 敵対的に大きな入力に対応するため、O(N^2)は避けるべき。

	// O(N) または O(N log N) で解く方法:
	// 1. 全てのペアを数える (O(N^2))
	// 2. ハッシュマップを使う (O(N))

	// ハッシュマップ (O(N)) を使用して、ターゲットから必要な値を計算する。
	// ターゲット T に対して、 numbers[i] + numbers[j] = T となるペアを探す。
	// numbers[j] = T - numbers[i]

	// 1. 出現頻度を記録する (O(N))
	freq := make(map[int64]int)
	for _, num := range numbers {
		freq[num]++
	}

	// 2. ペアの数を数える (O(N))
	totalPairs := 0
	
	// ターゲット T を達成するペアの数を数える
	for i := 0; i < n; i++ {
		num1 := numbers[i]
		// 必要な相手の値
		num2 := target - num1

		// num2 がリスト内に存在するか確認
		if countVal, ok := freq[num2]; ok {
			// 1. num1 == num2 の場合 (つまり 2 * num1 == target)
			if num1 == num2 {
				// 同じ値が複数存在する場合、組み合わせの数を計算する
				// freq[num1] 個の num1 があり、それらのうち 2 つを選ぶ組み合わせは C(freq[num1], 2)
				// C(n, 2) = n * (n - 1) / 2
				if freq[num1] >= 2 {
					totalPairs += freq[num1] * (freq[num1] - 1) / 2
				}
			} else {
				// 2. num1 != num2 の場合
				// num1 と num2 のペアを数える。
				// num1 が i 番目の要素に対応する。
				// num2 がリスト内の他の要素に対応する。
				// このループでは、各 i について、num2 が存在する全ての出現回数を加算する。
				// ただし、重複カウントを避けるため、num1 < num2 の場合のみカウントする。
				
				// ここで、元のリストのインデックスを考慮する必要があるが、
				// 頻度マップを使う場合、リスト内の要素の順序は無視されるため、
				// 組み合わせの数を数える問題に帰着する。

				// 別の方法: 2ポインタ法またはソート後のO(N)
				// 頻度マップを使う場合、同じペア (a, b) と (b, a) を数えないように注意が必要。
				// 今回は「位置が異なる 2 個の組」なので、リスト内のインデックス i != j のペアを数える。

				// 頻度マップを使った場合の正確なカウント方法:
				// ターゲット T に対して、 numbers[i] + numbers[j] = T となる (i < j) のペアを数える。
				
				// ターゲット T が偶数で、T/2 がリスト内に存在する場合:
				// T/2 と T/2 のペア: freq[T/2] * (freq[T/2] - 1) / 2
				
				// ターゲット T が奇数で、a と b のペア:
				// a != b のペア: freq[a] * freq[b]
				
				// 全ての異なる値のペアを数えるには、リストをソートしてから2ポインタ法を使うのが最も安全で効率的。
			}
		}
	}
	
	// --- O(N log N) ソート + 2ポインタ法による再計算 ---
	
	// 1. リストをソートする (O(N log N))
	// 元のリストの順序は不要なので、ソートしても問題ない。
	sort.Slice(numbers, func(i, j int) bool {
		return numbers[i] < numbers[j]
	})

	// 2. 2ポインタ法でペアを数える (O(N))
	count = 0
	left := 0
	right := n - 1

	for left < right {
		sum := numbers[left] + numbers[right]
		if sum == target {
			// numbers[left] と numbers[right] のペアが見つかった。
			// numbers[left] の後には numbers[left+1] から numbers[right-1] までの要素が、
			// numbers[right] と和がターゲットになる可能性がある。
			
			// numbers[left] が固定されたとき、numbers[right] と和がターゲットになるのは、
			// numbers[left] + target - numbers[left] = target。
			
			// ここで、numbers[left] と numbers[right] が一致しない限り、
			// numbers[left] と target - numbers[left] のペアを数える必要がある。
			
			// 2ポインタ法は、特定のターゲット値を持つペアを数えるのに適している。
			// 今回は、リスト内の任意の2要素の和がターゲットになるペアの総数を求める。
			
			// ターゲット T を達成するペアの数を数えるには、
			// 1. T/2 と T/2 のペア
			// 2. a と T-a のペア (a != T-a)
			
			// 2ポインタ法で、特定の和 T を持つペアを数えるのは、
			// ターゲット値が固定されている場合にのみ有効。
			// ここでは、全ての i < j についての和を数える必要があるため、2ポインタ法は不適切。
			
			// したがって、ハッシュマップを使った方法に戻り、重複を正しく処理する。
			// 最初のハッシュマップでのアプローチを修正する。
		} else if sum < target {
			left++
		} else {
			right--
		}
	}
	
	// --- 最終的なハッシュマップによる正確なカウント ---
	// リスト内の要素のインデックスを考慮する必要があるため、
	// 頻度マップでカウントする際に、リストの要素の出現順序を無視して、
	// どのインデックスのペアを数えるかを考慮する必要がある。
	// 
	// 問題文：「2 行目以降の整数のうち、足して目標値になる 2 個の組（位置が異なる 2 個）の個数を求めます。」
	// これは、入力された数列 $A = \{a_1, a_2, \dots, a_N\}$ に対して、
	// $i \neq j$ かつ $a_i + a_j = T$ となる $(i, j)$ の組の数を求めることを意味する。
	
	// 1. 頻度マップを作成 (O(N))
	freq = make(map[int64]int)
	for _, num := range numbers {
		freq[num]++
	}

	totalPairs = 0

	// 2. 各要素 a_i について、a_j = T - a_i となる j (i != j) の数を数える。
	// この方法では、リスト内の要素の重複を考慮する必要がある。
	// 
	// ターゲット T を達成するペア (a_i, a_j) を数える。
	// a_i がリスト内の $i$ 番目の要素、a_j が $j$ 番目の要素とする。
	
	// 全ての要素 $a_i$ について、 $a_j = T - a_i$ となる $j \neq i$ の数を数える。
	// 
	// 既にリスト $A$ が与えられているため、リストのインデックスを保持したまま処理する。
	
	// 3. リスト全体を走査し、インデックスを保持してペアを数える (O(N^2)だが、これが最も直接的)
	// 敵対的な入力に対応するため、Nが大きすぎる場合は、この問題設定は「値の組み合わせ」を問うものであり、
	// 順序を問わない（つまり、リスト内の要素のインデックスに依存しない）と解釈するのが一般的である。
	// もし順序が重要であれば、O(N^2)が避けられない。
	
	// 順序を無視し、値の組み合わせを数える（最も実用的な解釈）
	
	// 3. 頻度マップと値のペアで計算 (O(D) where D is number of distinct elements, D <= N)
	
	// ターゲット T が偶数の場合: T/2 と T/2 のペア
	if target%2 == 0 {
		half := target / 2
		if countVal, ok := freq[half]; ok {
			// C(countVal, 2)
			totalPairs += countVal * (countVal - 1) / 2
		}
	}

	// ターゲット T が奇数の場合: a と T-a のペア (a != T-a)
	// 探索範囲: a < T-a (つまり 2a < T, a < T/2)
	for num1, count1 := range freq {
		num2 := target - num1

		if num1 < num2 {
			if count2, ok := freq[num2]; ok {
				// num1 と num2 のペアを数える。
				// 各 num1 の出現回数 * 各 num2 の出現回数
				totalPairs += count1 * count2
			}
		}
	}

	// 最終出力
	fmt.Printf("pairs=%d\n", totalPairs)
}
