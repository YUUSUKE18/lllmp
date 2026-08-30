package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	totalCount := int64(0)
	memo := make(map[int]int64)

	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			count := int64(0)
			totalCount += count
			continue
		}

		if _, ok := memo[n]; !ok {
			// 偶数なら n/2, 奇数なら 3n+1
			var nextN int
			if n%2 == 0 {
				nextN = n / 2
			} else {
				nextN = 3*n + 1
			}

			// 再帰的に計算（メモ化を利用）
			count := 1 + memo[nextN]
			memo[n] = count
			totalCount += count
		} else {
			totalCount += memo[n]
		}
	}

	fmt.Printf("total=%d\n", totalCount)
}
