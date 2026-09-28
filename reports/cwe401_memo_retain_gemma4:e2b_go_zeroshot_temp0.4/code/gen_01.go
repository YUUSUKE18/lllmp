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

	// メモ化のためのマップ
	memo := make(map[int64]int64)

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

		// nが1の場合、手数は0
		if n == 1 {
			// メモ化
			memo[1] = 0
			continue
		}

		// 再帰的/反復的に手数を計算し、メモ化を適用する関数
		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			// メモがあればそれを使用
			if val, ok := memo[n]; ok {
				return val
			}

			var steps int64
			if n%2 == 0 {
				// nが偶数なら n/2
				steps = calculateSteps(n / 2)
			} else {
				// nが奇数なら 3n+1
				steps = calculateSteps(3*n + 1)
			}

			// メモに保存
			memo[n] = steps
			return steps
		}

		// 計算実行
		steps := calculateSteps(n)
		totalSteps += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
