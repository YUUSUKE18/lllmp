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
		if err != nil || n < 1 {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 再帰的な計算とメモ化
		var calculateSteps func(n int) int64
		calculateSteps = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if result, ok := memo[n]; ok {
				return result
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = calculateSteps(n / 2) + 1
			} else {
				// n が奇数なら 3n+1
				steps = calculateSteps(3*n + 1) + 1
			}

			memo[n] = steps
			return steps
		}

		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
