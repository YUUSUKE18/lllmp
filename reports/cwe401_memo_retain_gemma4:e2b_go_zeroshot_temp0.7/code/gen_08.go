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
	var total int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数としてパースを試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 再帰/繰り返し計算関数
		var count int64 = calculateSteps(n, memo)
		total += count
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}

// calculateSteps は、与えられた数 n から 1 に到達するまでの手数を計算する関数
func calculateSteps(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var steps int64
	if n%2 == 0 {
		// n が偶数なら n/2
		steps = 1 + calculateSteps(n/2, memo)
	} else {
		// n が奇数なら 3n+1
		steps = 1 + calculateSteps(3*n+1, memo)
	}

	// 結果をメモ化
	memo[n] = steps
	return steps
}
