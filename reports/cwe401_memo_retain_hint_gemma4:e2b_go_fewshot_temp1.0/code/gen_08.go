package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からすべての行を読み込む
	inputData, err := os.ReadFile(0) // os.Stdinを読み込む
	if err != nil {
		// 入力エラーが発生した場合、何も出力せずに終了
		return
	}
	input := string(inputData)
	lines := strings.Split(strings.TrimSpace(input), "\n")

	totalCount := 0
	// メモ化テーブル (Map)
	memo := make(map[int]int)

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 再帰的/メモ化再帰で手数を計算する関数
		var calculateSteps func(k int) int
		calculateSteps = func(k int) int {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var steps int
			if k%2 == 0 {
				// n が偶数なら n/2
				steps = calculateSteps(k / 2)
			} else {
				// n が奇数なら 3n+1
				steps = calculateSteps(3*k + 1)
			}

			// メモ化
			memo[k] = steps
			return steps
		}

		// 計算実行
		steps := calculateSteps(n)
		totalCount += steps
	}

	// 結果を1行で出力
	fmt.Printf("total=%d\n", totalCount)
}
