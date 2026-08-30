package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 入力を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化のためのマップ
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

		// 再帰的または反復的に操作をシミュレーションし、メモ化を利用する関数を定義
		// ここでは、与えられたnから1に到達するまでの手数を計算する関数を実装する
		count := countSteps(n, memo)
		total += count
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}

// countSteps は、nから1に到達するまでの手数を計算し、メモ化を利用する
func countSteps(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var steps int64 = 0
	current := n

	// 1に到達するまで繰り返す
	for current != 1 {
		if current%2 == 0 {
			// n が偶数なら n/2
			current /= 2
		} else {
			// n が奇数なら 3n+1
			current = 3*current + 1
		}
		steps++
	}

	// 計算結果をメモ化
	memo[n] = steps
	return steps
}
