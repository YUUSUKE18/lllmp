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
		// 空行または整数として解釈できない行は無視
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n <= 0 {
			continue // 1 以上の整数が与えられる前提だが念のため
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 経路を追跡するための再帰関数（メモ化再帰）
		var calculateMoves func(n int64) int64
		calculateMoves = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if result, ok := memo[n]; ok {
				return result
			}

			var moves int64
			if n%2 == 0 {
				// nが偶数なら n/2
				moves = 1 + calculateMoves(n/2)
			} else {
				// nが奇数なら 3n+1
				moves = 1 + calculateMoves(3*n+1)
			}

			memo[n] = moves
			return moves
		}

		moves := calculateMoves(n)
		totalMoves += moves
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalMoves)
}
