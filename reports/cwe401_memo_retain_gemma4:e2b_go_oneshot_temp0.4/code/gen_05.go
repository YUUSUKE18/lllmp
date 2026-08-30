package main

import (
	"bufio"
	"fmt"
	"os"
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

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰的計算とメモ化
		var steps int64
		if n%2 == 0 {
			// nが偶数なら n/2
			steps = 1 + memo[n/2]
		} else {
			// nが奇数なら 3n+1
			steps = 1 + memo[3*n+1]
		}

		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
