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
	var total int64 = 0

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

		// メモ化のためのマップ（動的計画法/メモ化）
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
			current := n
			for current != 1 {
				if current%2 == 0 {
					current = current / 2
				} else {
					current = 3*current + 1
				}
				steps++
			}

			memo[n] = steps
			return steps
		}

		// 手数を計算
		steps := calculateSteps(n)
		total += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}
