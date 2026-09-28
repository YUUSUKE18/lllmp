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
			// nが1のときの手数は0
			memo[1] = 0
		} else if _, ok := memo[n]; !ok {
			// 再帰または動的計画法で計算
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

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", total)
}
