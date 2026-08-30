package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalMoves int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

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
		nInt := int64(n)

		if nInt == 1 {
			// nが1のときの手数は0
			totalMoves += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculateMoves func(n int64) int64
		calculateMoves = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// nが偶数なら n/2
				result = calculateMoves(n / 2)
			} else {
				// nが奇数なら 3n+1
				result = calculateMoves(3*n + 1)
			}

			// メモ化
			memo[n] = result
			return result
		}

		// 計算実行
		moves := calculateMoves(nInt)
		totalMoves += moves
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalMoves)
}
