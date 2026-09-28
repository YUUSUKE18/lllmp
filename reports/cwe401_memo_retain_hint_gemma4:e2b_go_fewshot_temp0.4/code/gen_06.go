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

		// 再帰または反復計算で手数を求める関数
		var calculateSteps func(n int) int64
		calculateSteps = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = calculateSteps(n / 2)
			} else {
				// n が奇数なら 3n+1
				steps = 3*int64(n) + 1 + calculateSteps(3*int(n)+1)
			}

			memo[n] = steps
			return steps
		}

		// 計算実行
		steps := calculateSteps(n)
		total += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", total)
}
