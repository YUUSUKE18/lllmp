package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 入力を標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var totalSteps int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解析を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化された値があればそれを使用
		if steps, found := memo[n]; found {
			totalSteps += steps
			continue
		}

		// 再帰的または反復的に計算（メモ化を利用）
		if n == 1 {
			memo[1] = 0
		} else if n%2 == 0 {
			// n が偶数なら n/2
			nextN := n / 2
			// 再帰的に計算し、結果をメモ化
			steps := memo[nextN] + 1
			memo[n] = steps
		} else {
			// n が奇数なら 3n+1
			nextN := 3*n + 1
			// 再帰的に計算し、結果をメモ化
			steps := memo[nextN] + 1
			memo[n] = steps
		}

		// このクエリの結果を合計に加算
		totalSteps += memo[n]
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalSteps)
}
