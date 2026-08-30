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
	var totalMoves int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視 (仕様に基づき)
			continue
		}
		n64 := int64(n)

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 経路探索とメモ化の関数
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
				// n が偶数なら n/2
				result = calculateMoves(n / 2)
			} else {
				// n が奇数なら 3n+1
				result = calculateMoves(3*n + 1)
			}

			// メモに保存
			memo[n] = result
			return result
		}

		// 各クエリに対する手数を計算
		moves := calculateMoves(n64)
		totalMoves += moves
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalMoves)
}
