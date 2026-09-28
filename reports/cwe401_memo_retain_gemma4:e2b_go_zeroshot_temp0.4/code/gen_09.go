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

		// nが1以上の整数であるか確認（仕様上は1以上だが、念のため）
		if n < 1 {
			continue
		}

		// 再帰的または反復的に操作を計算する関数（メモ化付き）
		var count int64 = calculateSteps(n, memo)
		total += count
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}

// calculateSteps は、与えられた数 n から 1 に到達するまでの手数を計算し、メモ化を行う
func calculateSteps(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}

	// メモに既に結果があれば返す
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64

	if n%2 == 0 {
		// nが偶数なら n/2
		result = calculateSteps(n/2, memo)
	} else {
		// nが奇数なら 3n+1
		result = calculateSteps(3*n+1, memo)
	}

	// メモに結果を保存して返す
	memo[n] = result
	return result
}
