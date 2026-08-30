package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化テーブル
	memo := make(map[int]int64)
	memo[1] = 0

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
			// 1の場合は手数は0
			total += 0
			continue
		}

		// 再帰/メモ化による計算
		if _, ok := memo[n]; !ok {
			// nがmemoにない場合、再帰的に計算し、結果をメモする
			var steps int64
			if n%2 == 0 {
				// nが偶数なら n/2
				steps = 1 + memo[n/2]
			} else {
				// nが奇数なら 3n+1
				steps = 1 + memo[3*n+1]
			}
			memo[n] = steps
		}

		// メモ化された結果を合計に加算
		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}
