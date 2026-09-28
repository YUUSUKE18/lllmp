package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// メモ化を保持するマップ
		memo := make(map[int]int64)

		var calculateSteps func(n int) int64
		calculateSteps = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var steps int64 = 0
			currentN := n
			
			// 1に到達するまでの手数を計算
			for currentN != 1 {
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
			}

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
