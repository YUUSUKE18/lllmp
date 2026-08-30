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

		// 関数を定義して再帰的または反復的に計算する
		var count int64 = calculateSteps(n, memo)
		total += count
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}

// calculateSteps は、与えられた数 n から 1 に到達するまでの手数を計算する関数
// memo は計算結果を保存するためのマップ
func calculateSteps(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}

	// メモ化のチェック
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64

	if n%2 == 0 {
		// n が偶数なら n/2
		result = calculateSteps(n/2, memo)
	} else {
		// n が奇数なら 3n+1
		result = calculateSteps(3*n+1, memo)
	}

	// 計算結果をメモ化
	memo[n] = result
	return result
}
