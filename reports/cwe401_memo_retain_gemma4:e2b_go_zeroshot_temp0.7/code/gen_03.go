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
	var totalSum int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行や数値として解釈できない行は無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// nが1の場合は手数は0
		if n == 1 {
			handCount := int64(0)
			totalSum += handCount
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			totalSum += val
			continue
		}

		// 再帰的/反復的に計算
		var steps int64 = 0
		current := n

		for current != 1 {
			if current%2 == 0 {
				// nが偶数なら n/2
				current /= 2
			} else {
				// nが奇数なら 3n+1
				current = 3*current + 1
			}
			steps++
		}

		// 計算結果をメモ化し、合計に加算
		memo[n] = steps
		totalSum += steps
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalSum)
}
