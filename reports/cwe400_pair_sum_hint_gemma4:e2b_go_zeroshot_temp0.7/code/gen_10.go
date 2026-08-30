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

	// 2行目以降: 数値の読み込みと処理
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
		// 整数として解釈できない行は無視される (err != nil の場合)
	}

	n := len(numbers)
	count := 0

	// 2個の組 (a, b) が存在し a + b = target となるものの個数を数える
	// O(N^2) は入力サイズが大きい場合に間に合わない可能性があるため、
	// O(N log N) または O(N) の方法を採用する。
	// ここでは、ハッシュマップ（またはソート＋二分探索）を用いて O(N) または O(N log N) で解く。

	// 2つの要素 a と b が numbers の中に存在し、a != b かつ a + b = target となる組の数を数える。
	// 問題文は「2 個の組（位置が異なる 2 個）の個数」を求めているため、
	// 配列内のインデックス i と j (i != j) について numbers[i] + numbers[j] = target を満たす組の数を数える。

	// 2つの要素が同じ値を持つ場合の扱い：
	// 複数の要素が同じ値を持つ場合、その値の出現回数を考慮する必要がある。

	// 頻度マップを作成
	freq := make(map[int64]int)
	for _, num := range numbers {
		freq[num]++
	}

	totalPairs := 0

	// すべてのユニークな値についてペアを数える
	for a, countA := range freq {
		b := target - a

		if countB, exists := freq[b]; exists {
			if a < b {
				// a と b が異なる場合 (a != b)
				// (a, b) の組を数える。a の出現回数 * b の出現回数
				totalPairs += countA * countB
			} else if a == b {
				// a と b が同じ場合 (2a = target)
				// この場合、a から選ぶ2つの異なる要素の組の数を数える。
				// a の出現回数が countA の場合、組み合わせの数は countA * (countA - 1) / 2
				if countA >= 2 {
					totalPairs += countA * (countA - 1) / 2
				}
			}
		}
	}

	// totalPairs は (a, b) の順序を考慮せず、(a, b) と (b, a) を重複して数えている可能性があるため、
	// 最終的な結果は totalPairs / 2 になるべきだが、
	// 問題は「位置が異なる 2 個の組」なので、これは (i, j) と (j, i) を区別しない、つまり集合 $\{numbers[i], numbers[j]\}$ を数えることになる。

	// 最終的な結果は、(a, b) の順序を考慮しない、一意なペアの数である。
	// 上記のループでは a < b の場合のみカウントしているため、重複は発生しない。

	// ただし、元の問題文の解釈が「インデックス i != j を満たす組」であれば、
	// 実際には i, j のペアを数える必要がある。
	// numbers[i] + numbers[j] = target (i != j)

	// 集合論的なアプローチ (上記で計算したもの)が、値の重複を考慮した「位置が異なる2個の組」の数を正しく数える。

	fmt.Printf("pairs=%d\n", totalPairs)
}
