package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	totalCount := int64(0)
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)
		
		// nが1の場合は手数は0
		if n == 1 {
			memo[1] = 0
		} else {
			// 再帰または反復処理で手数を計算
			// ここではメモ化再帰（動的計画法）を使用します
			var calculateSteps func(k int64) int64
			calculateSteps = func(k int64) int64 {
				if k == 1 {
					return 0
				}
				if val, ok := memo[k]; ok {
					return val
				}

				var steps int64
				if k%2 == 0 {
					// nが偶数なら n/2
					steps = calculateSteps(k / 2) + 1
				} else {
					// nが奇数なら 3n+1
					steps = calculateSteps(3*k + 1) + 1
				}
				
				memo[k] = steps
				return steps
			}
			
			steps := calculateSteps(n)
			totalCount += steps
		}
	}

	fmt.Printf("total=%d\n", totalCount)
}
