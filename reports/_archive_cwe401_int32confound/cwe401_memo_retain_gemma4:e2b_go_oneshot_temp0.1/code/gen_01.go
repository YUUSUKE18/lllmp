package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)
		memo[1] = 0

		currentN := n
		steps := int64(0)

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps += memo[currentN]
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 実際には、再帰的なメモ化（または動的計画法）がより適切だが、
		// ここでは与えられた操作を直接シミュレーションし、メモ化を適用する。
		// 課題の意図を再解釈し、各クエリ n について、n から 1 に到達するまでの手数を求める。
		// 繰り返し操作を「1に到達するまでの手数」と解釈する。

		// 再度、メモ化をより適切に適用する（DP/メモ化再帰の考え方）
		// 1からnまでの計算を一度に行う方が効率的。
		// しかし、入力がクエリごとに与えられるため、各クエリに対して計算する。

		// 簡略化のため、各クエリ n について、nから1へのパスを計算する。
		// 繰り返し操作を「nから1に到達するまでのステップ数」と解釈する。

		// 繰り返し操作の計算を再実行（メモ化を適用）
		steps = 0
		currentN = n
		path := []int64{}

		for currentN != 1 {
			if currentN == 0 { // 0になることはないが念のため
				break
			}
			path = append(path, currentN)

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
		}
		// 1に到達するまでのステップ数は、pathの長さ（最後の1を除く）
		// ただし、n=1の場合は0ステップ。
		if n == 1 {
			total += 0
		} else {
			// nからスタートして1に到達するまでの操作回数を数える
			// 例: n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
			// 実際には、nが1になるまでの操作回数を数える。
			// 1に到達するまでの操作回数を求める。
			// 1に到達するまでの操作回数は、nが1になるまでのステップ数。
			// 1に到達するまでのステップ数を求めるには、nを1に到達するまでのパスを辿る。

			// 課題の操作はCollatz予想の操作。nが1になるまでのステップ数を求める。
			// n=1の手数は0。
			// n=6: 6 -> 3 (1) -> 10 (2) -> 5 (3) -> 16 (4) -> 8 (5) -> 4 (6) -> 2 (7) -> 1 (8) -> 手数8
			// 1に到達するまでの手数を求める。
			
			// 1に到達するまでの手数を求めるため、再帰的なメモ化を使用する。
			
			memoFinal := make(map[int64]int64)
			memoFinal[1] = 0

			var calculateSteps func(k int64) int64
			calculateSteps = func(k int64) int64 {
				if k == 1 {
					return 0
				}
				if val, ok := memoFinal[k]; ok {
					return val
				}

				var next int64
				if k%2 == 0 {
					next = k / 2
				} else {
					next = 3*k + 1
				}

				result := 1 + calculateSteps(next)
				memoFinal[k] = result
				return result
			}

			total += calculateSteps(n)
		}
	}

	fmt.Printf("total=%d\n", total)
}
