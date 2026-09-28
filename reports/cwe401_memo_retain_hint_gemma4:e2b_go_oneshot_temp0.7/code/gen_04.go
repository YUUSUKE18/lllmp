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

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculate func(n int64) int64
		calculate = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				result = calculate(n / 2)
			} else {
				result = calculate(3*n + 1)
			}

			memo[n] = result
			return result
		}

		// 計算実行
		handCount := calculate(n)
		total += handCount
	}

	fmt.Printf("total=%d\n", total)
}
