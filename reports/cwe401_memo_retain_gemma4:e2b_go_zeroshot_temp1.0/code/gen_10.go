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
	var totalSteps int64 = 0

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

		// 関数呼び出しとメモ化を実装する再帰関数（または反復）
		steps := calculateSteps(n, memo)
		totalSteps += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}

// calculateSteps は、与えられた数 n が 1 に到達するまでの手数を計算する関数
// メモ化を内部で行う
func calculateSteps(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}

	// メモがあればそれを使用
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64

	// n が偶数なら n/2
	if n%2 == 0 {
		result = calculateSteps(n/2, memo)
	} else {
		// n が奇数なら 3n+1
		result = calculateSteps(3*n+1, memo)
	}

	// 計算結果をメモ化
	memo[n] = result
	return result
}
