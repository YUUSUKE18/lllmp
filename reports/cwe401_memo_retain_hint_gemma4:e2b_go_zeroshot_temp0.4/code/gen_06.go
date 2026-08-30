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
	var totalSteps int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 行を整数としてパースする
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 繰り返し操作をシミュレーションし、メモ化を行う関数
		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
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

			// メモに保存
			memo[n] = steps
			return steps
		}

		// クエリ n に対する手数を計算
		steps := calculateSteps(n)
		totalSteps += steps
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalSteps)
}
