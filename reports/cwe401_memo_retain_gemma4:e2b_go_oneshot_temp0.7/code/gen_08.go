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
			// 1 に到達するまでの手数は 0
			total += 0
			continue
		}

		// 再帰または反復計算とメモ化
		if _, ok := memo[n]; !ok {
			// 3n+1 または n/2 の操作を繰り返す
			var steps int64 = 0
			current := n
			for current != 1 {
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				steps++
			}
			memo[n] = steps
		}

		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}
