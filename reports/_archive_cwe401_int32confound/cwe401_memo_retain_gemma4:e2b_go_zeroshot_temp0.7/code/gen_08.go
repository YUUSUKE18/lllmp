package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// n が 1 のときの手数は 0
			// total には 0 を加算
		} else {
			// 繰り返し操作とメモ化による計算
			history := make(map[int]int64)
			// ターゲット n から 1 に到達するまでの手数を求める
			count := int64(0)
			current := n

			// 計算の途中で同じ数に到達した場合、その時点で停止する（メモ化の利用）
			for current != 1 {
				if count > 0 && history[current] != 0 {
					// すでに計算済み
					break
				}

				if current == 1 {
					// 1 に到達した場合は、その手数を加算
					break
				}

				// メモ化された値があればそれを使う
				if val, ok := history[current]; ok {
					count += val
					break
				}

				// 操作の実行
				if current%2 == 0 {
					current = current / 2
				} else {
					current = 3*current + 1
				}
				count++
			}

			// 最終的な手数を記録（到達した時点で count が手数）
			// 実際には、再帰的なメモ化（または反復的なメモ化）が最も効率的だが、
			// ここでは単純な反復でメモ化を適用する。
			// 厳密には、n から 1 へのパスの長さを求める問題であり、
			// 1 に到達するまでのステップ数を数える必要がある。

			// 再度、メモ化をより正しく適用する
			memo := make(map[int]int64)
			memo[1] = 0

			var calculate func(k int) int64
			calculate = func(k int) int64 {
				if k <= 0 {
					return -1 // エラーケース
				}
				if val, ok := memo[k]; ok {
					return val
				}

				var result int64
				if k%2 == 0 {
					// n が偶数なら n/2
					result = calculate(k / 2) + 1
				} else {
					// n が奇数なら 3n+1
					result = calculate(3*k + 1) + 1
				}
				memo[k] = result
				return result
			}

			// 計算実行
			handCount := calculate(n)
			total += handCount
		}
	}

	fmt.Printf("total=%d\n", total)
}
