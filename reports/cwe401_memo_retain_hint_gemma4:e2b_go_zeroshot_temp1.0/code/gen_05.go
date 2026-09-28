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
		// 空行を無視
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			continue
		}

		// メモ化テーブル
		memo := make(map[int64]int64)
		memo[1] = 0

		// 現在の数から1に到達するまでの手数を計算（メモ化再帰/動的計画法）
		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// nが偶数なら n/2
				result = calculateSteps(n / 2)
			} else {
				// nが奇数なら 3n+1
				result = calculateSteps(3*n + 1)
			}

			// メモ化
			memo[n] = result
			return result
		}

		steps := calculateSteps(n)
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視しても良いが、念のため）
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
