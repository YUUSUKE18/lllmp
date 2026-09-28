package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total uint64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		if n == 1 {
			// nが1のときの手数は0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]uint64)

		var calculate func(k int) uint64
		calculate = func(k int) uint64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result uint64
			if k%2 == 0 {
				// nが偶数なら n/2
				result = calculate(k / 2)
			} else {
				// nが奇数なら 3n+1
				result = calculate(3*k + 1)
			}

			memo[k] = result
			return result
		}

		// 計算実行と合計への加算
		cost := calculate(n)
		total += cost
	}

	fmt.Printf("total=%d\n", total)
}
