package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		var count func(n int) int64
		count = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if result, ok := memo[n]; ok {
				return result
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = count(n / 2) + 1
			} else {
				// n が奇数なら 3n+1
				steps = count(3*n+1) + 1
			}

			memo[n] = steps
			return steps
		}

		// 計算実行
		result := count(n)
		total += result
	}

	fmt.Printf("total=%d\n", total)
}
