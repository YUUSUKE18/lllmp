package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// 各行を処理する
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化を格納するためのマップ
		memo := make(map[int]int)

		var calculateMoves func(n int) int
		calculateMoves = func(n int) int {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var moves int
			if n%2 == 0 {
				// n が偶数なら n/2
				moves = calculateMoves(n / 2)
			} else {
				// n が奇数なら 3n+1
				moves = 3*n + 1
			}

			// 再帰的に計算された手数に現在の1回を加える
			result := 1 + moves
			memo[n] = result
			return result
		}

		// n から 1 に到達するまでの手数を計算
		moves := calculateMoves(n)
		total += int64(moves)
	}

	// 結果を1行で出力
	fmt.Printf("total=%d\n", total)
}
