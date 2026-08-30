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

	// メモ化のためのマップ
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
			// n=1 のときの手数は 0
			memo[1] = 0
		} else if _, ok := memo[n]; !ok {
			// 再帰または反復計算で結果を求める
			var count int64 = 0
			current := n
			for current != 1 {
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				count++
			}
			memo[n] = count
		}

		total += memo[n]
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、通常は考慮する
	}

	fmt.Printf("total=%d\n", total)
}
