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
			// n が 1 のときの手数は 0
			count := int64(0)
			totalCount += count
			// メモ化は n=1 の場合は既に考慮済みだが、念のため
			memo[1] = 0
			continue
		}

		// 再帰/メモ化による計算
		if _, ok := memo[n]; !ok {
			// n が偶数なら n/2
			if n%2 == 0 {
				memo[n] = int64(1) + memo[n/2]
			} else {
				// n が奇数なら 3n+1
				memo[n] = int64(1) + memo[3*n+1]
			}
		}

		totalCount += memo[n]
	}

	fmt.Printf("total=%d\n", totalCount)
}
