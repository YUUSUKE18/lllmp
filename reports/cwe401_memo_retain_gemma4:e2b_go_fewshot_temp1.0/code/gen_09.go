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

	// メモ化テーブル
	memo := make(map[int]int64)

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
			memo[n] = 0
		} else if _, found := memo[n]; !found {
			// 再帰的な計算とメモ化
			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = memo[n/2] + 1
			} else {
				// n が奇数なら 3n+1
				steps = memo[3*n+1] + 1
			}
			memo[n] = steps
		}

		// 計算結果を合計に加算
		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}
