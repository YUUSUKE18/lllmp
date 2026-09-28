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
			// n が 1 のときの手数は 0
			// total には 0 を加算
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)
		memo[1] = 0

		// 再帰または反復で手数を計算（メモ化付き）
		var calculateSteps func(current int64) int64
		calculateSteps = func(current int64) int64 {
			if current == 1 {
				return 0
			}
			if result, ok := memo[current]; ok {
				return result
			}

			var steps int64
			if current%2 == 0 {
				// n が偶数なら n/2
				steps = 1 + calculateSteps(current/2)
			} else {
				// n が奇数なら 3n+1
				steps = 1 + calculateSteps(3*current+1)
			}

			memo[current] = steps
			return steps
		}

		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
