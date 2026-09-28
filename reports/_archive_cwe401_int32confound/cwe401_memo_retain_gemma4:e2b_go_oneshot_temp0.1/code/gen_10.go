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
		// 課題の操作は、Collatz予想に関連する操作である。
		// n から 1 への最短経路を求める。

		// 実行時のメモ化を再構築
		memo = make(map[int64]int64)
		memo[1] = 0
		
		// 最終的な手数を計算する関数（再帰的メモ化）
		var calculateSteps func(k int64) int64
		calculateSteps = func(k int64) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				result = calculateSteps(k / 2)
			} else {
				result = calculateSteps(3*k + 1)
			}

			memo[k] = result
			return result
		}

		// 各クエリ n について計算
		stepsForN := calculateSteps(n)
		total += stepsForN
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", total)
}
