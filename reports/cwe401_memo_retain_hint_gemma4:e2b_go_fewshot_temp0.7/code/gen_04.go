package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	totalCount := 0

	// Memoization table
	memo := make(map[int]int)

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
			// nが1のときの手数は0
			memo[1] = 0
		} else if _, ok := memo[n]; !ok {
			// 再帰または動的計画法で計算
			var steps int
			if n%2 == 0 {
				// nが偶数なら n/2
				steps = memo[n/2] + 1
			} else {
				// nが奇数なら 3n+1
				steps = memo[3*n+1] + 1
			}
			memo[n] = steps
		}
		
		// 結果の加算
		if steps, ok := memo[n]; ok {
			totalCount += steps
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", totalCount)
}
