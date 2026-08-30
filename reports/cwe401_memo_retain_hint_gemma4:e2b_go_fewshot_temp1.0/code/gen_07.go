package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	totalCount := 0

	// メモ化のためのマップ
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
			// nが1のときの手数は0
			if _, ok := memo[1]; !ok || memo[1] != 0 {
				memo[1] = 0
			}
			totalCount += 0
			continue
		}

		// 再帰的または動的計画法で計算し、メモ化を適用する
		// ここでは再帰呼び出しとメモ化を組み合わせる
		count := calculateSteps(n, memo)
		totalCount += count
	}

	fmt.Printf("total=%d\n", totalCount)
}

// calculateSteps は、nが1になるまでの手数を再帰的に計算し、結果をmemoに保存する
func calculateSteps(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var result int
	if n%2 == 0 {
		// nが偶数なら n/2
		result = calculateSteps(n/2, memo)
	} else {
		// nが奇数なら 3n+1
		result = 3*n + 1
		result += calculateSteps(result, memo)
	}

	// 結果をメモ化
	memo[n] = result
	return result
}
