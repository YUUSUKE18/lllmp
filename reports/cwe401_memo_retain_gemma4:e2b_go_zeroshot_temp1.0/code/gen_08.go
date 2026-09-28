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

	// 再帰的な操作の計算をメモ化するためのマップ
	memo := make(map[int]int64)

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

		// nが1のときの手数は0
		if n == 1 {
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			totalMoves += val
			continue
		}

		// 再帰的に計算
		var moves int64
		if n%2 == 0 {
			// nが偶数なら n/2
			moves = calculateMoves(n/2, memo)
		} else {
			// nが奇数なら 3n+1
			moves = calculateMoves(3*n+1, memo)
		}

		// 結果をメモ化し、合計に加算
		memo[n] = moves
		totalMoves += moves
	}

	// すべてのクエリが処理された後の合計を出力
	fmt.Printf("total=%d\n", totalMoves)
}

// calculateMoves は、与えられた数から1に到達するまでの手数を計算する関数
// memo は計算結果をメモ化するためのマップ
func calculateMoves(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}

	// メモ化された値を確認
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64
	if n%2 == 0 {
		// nが偶数なら n/2
		result = calculateMoves(n/2, memo)
	} else {
		// nが奇数なら 3n+1
		result = calculateMoves(3*n+1, memo)
	}

	// 計算結果をメモ化
	memo[n] = result
	return result
}
