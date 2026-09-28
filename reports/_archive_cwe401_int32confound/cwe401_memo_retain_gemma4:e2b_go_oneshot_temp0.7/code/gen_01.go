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

		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = 1 + calculateSteps(n/2)
			} else {
				// n が奇数なら 3n+1
				steps = 1 + calculateSteps(3*n+1)
			}

			memo[n] = steps
			return steps
		}

		// 計算実行と合計の加算
		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
