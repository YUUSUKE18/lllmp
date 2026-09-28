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
			// n が 1 のときの手数は 0
			currentSteps := int64(0)
		} else {
			// メモ化された値があればそれを使用
			if val, ok := memo[n]; ok {
				currentSteps = val
			} else {
				// 再帰的計算とメモ化
				var steps int64
				if n%2 == 0 {
					// n が偶数なら n/2
					steps = memo[n/2] + 1
				} else {
					// n が奇数なら 3n+1
					steps = memo[3*n+1] + 1
				}
				memo[n] = steps
				currentSteps = steps
			}
		}

		total += currentSteps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、厳密性を保つため）
	}

	fmt.Printf("total=%d\n", total)
}
