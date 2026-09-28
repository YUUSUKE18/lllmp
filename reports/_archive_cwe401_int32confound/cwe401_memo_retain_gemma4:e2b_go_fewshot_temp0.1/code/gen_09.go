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
		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)
		memo[1] = 0

		// 再帰または動的計画法で計算
		var calculate func(k int) int64
		calculate = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				// nが偶数なら n/2
				result = calculate(k / 2)
			} else {
				// nが奇数なら 3n+1
				result = calculate(3*k + 1)
			}

			memo[k] = result
			return result
		}

		// 計算実行
		result := calculate(n)
		total += result
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", total)
}
