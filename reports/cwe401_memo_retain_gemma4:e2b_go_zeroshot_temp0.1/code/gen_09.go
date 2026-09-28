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
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// nが1以上の整数であるか確認（仕様上は1以上の整数が並ぶと仮定）
		if n < 1 {
			continue
		}

		// 再帰的または反復的に手数を計算する関数
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
				// nが偶数なら n/2
				steps = calculateSteps(n / 2)
			} else {
				// nが奇数なら 3n+1
				steps = calculateSteps(3*n + 1)
			}

			// メモ化
			memo[n] = steps
			return steps
		}

		// 手数を計算
		steps := calculateSteps(n)
		totalSteps += steps
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalSteps)
}
