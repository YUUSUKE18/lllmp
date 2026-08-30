package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	totalMoves := 0
	memo := make(map[int]int)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// n=1 のときは手数は 0
			continue
		}

		// メモ化された値があればそれを使用
		if moves, ok := memo[n]; ok {
			totalMoves += moves
			continue
		}

		// 計算処理
		var moves int
		if n%2 == 0 {
			// n が偶数なら n/2
			moves = moves(n/2)
		} else {
			// n が奇数なら 3n+1
			moves = moves(3*n + 1)
		}

		// 再帰的に計算し、メモ化
		// 1 に到達するまでの手数を求める
		// 1 の手数は 0
		if moves == 1 {
			memo[n] = 0
		} else {
			// 既に計算済みの値があればそれを使用
			if res, ok := memo[moves]; ok {
				memo[n] = res + 1
			} else {
				// 再帰呼び出し
				memo[n] = 1 + calculateMoves(moves)
			}
		}

		totalMoves += memo[n]
	}

	// 最終的な合計を出力
	fmt.Printf("total=%d\n", totalMoves)
}

// calculateMoves は n から 1 に到達するまでの手数を計算する関数。
// memo は計算結果を保存するためのマップ。
func calculateMoves(n int) int {
	if n == 1 {
		return 0
	}
	if moves, ok := memo[n]; ok {
		return moves
	}

	var next int
	if n%2 == 0 {
		next = n / 2
	} else {
		next = 3*n + 1
	}

	// 再帰的に計算
	result := 1 + calculateMoves(next)
	memo[n] = result
	return result
}
