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

	// メモ化のためのマップ
	memo := make(map[int64]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		if n == 1 {
			// nが1のときの手数は0
			steps := int64(0)
			totalSteps += steps
			// memo[1] = 0 // 1はベースケースなので省略可能だが、念のため
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			totalSteps += val
			continue
		}

		// 再帰的/反復的に計算
		var currentN int64 = n
		steps := int64(0)

		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				// 途中でメモ化された値に到達した場合
				steps += val
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 最終的な結果をメモ化
		memo[n] = steps
		totalSteps += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（ここでは無視しても良いが、堅牢性を高める）
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
