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

		// 整数として解釈を試みる
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
			if result, ok := memo[n]; ok {
				return result
			}

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
			return steps
		}

		// クエリ n の手数を計算し、合計に加算
		steps := calculateSteps(n)
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常、この問題設定では不要だが念のため）
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
