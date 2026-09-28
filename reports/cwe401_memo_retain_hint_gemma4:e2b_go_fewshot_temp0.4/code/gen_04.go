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
			memo[n] = 0
		} else if _, ok := memo[n]; !ok {
			// 再帰または動的計画法で計算
			var count int64 = 0
			currentN := n
			for currentN != 1 {
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				count++
			}
			memo[n] = count
		}

		total += memo[n]
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されるが、堅牢性のために残す）
	}

	fmt.Printf("total=%d\n", total)
}
