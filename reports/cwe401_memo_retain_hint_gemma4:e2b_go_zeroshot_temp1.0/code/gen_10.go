package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		// 空行または整数として解釈できない行は無視
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = calculateSteps(n / 2) + 1
			} else {
				// n が奇数なら 3n+1
				steps = calculateSteps(3*n + 1) + 1
			}

			memo[n] = steps
			return steps
		}

		// 計算実行
		result := calculateSteps(n)
		total += result
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常、競技プログラミングではここでは特に不要だが念のため）
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}
