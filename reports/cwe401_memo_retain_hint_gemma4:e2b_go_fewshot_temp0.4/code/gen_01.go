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

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			totalCount += val
			continue
		}

		// 再帰的/反復的に計算し、メモ化する
		if n == 1 {
			memo[1] = 0
		} else if n%2 == 0 {
			// n が偶数なら n/2
			result := calculate(n, memo)
			memo[n] = result
		} else {
			// n が奇数なら 3n+1
			result := calculate(3*n + 1, memo)
			memo[n] = result
		}

		totalCount += memo[n]
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", totalCount)
}

// calculate は再帰的またはメモ化再帰的に操作を繰り返して 1 に到達するまでの手数を計算する関数
func calculate(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var result int
	if n%2 == 0 {
		// n が偶数なら n/2
		result = calculate(n/2, memo)
	} else {
		// n が奇数なら 3n+1
		result = calculate(3*n+1, memo)
	}

	// メモ化
	memo[n] = 1 + result
	return 1 + result
}
