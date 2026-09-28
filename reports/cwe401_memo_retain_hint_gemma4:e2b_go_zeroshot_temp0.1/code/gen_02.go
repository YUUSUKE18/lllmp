package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalSteps int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if result, ok := memo[n]; ok {
				return result
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = 1 + calculateSteps(n/2)
			} else {
				// n が奇数なら 3n+1
				steps = 1 + calculateSteps(3*n+1)
			}

			memo[n] = steps
			return steps
		}

		// クエリ n に対する手数を計算
		steps := calculateSteps(n)
		totalSteps += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
