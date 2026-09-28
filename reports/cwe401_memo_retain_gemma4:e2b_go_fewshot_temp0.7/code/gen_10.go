package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

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
			// n=1 のときの手数は 0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰的計算とメモ化
		var steps int64
		if n%2 == 0 {
			// n が偶数なら n/2
			steps = calculate(n/2, memo)
		} else {
			// n が奇数なら 3n+1
			steps = calculate(3*n+1, memo)
		}

		// 現在のnに対する計算結果をメモ化
		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

// calculate は再帰的にステップ数を計算し、メモ化を更新するヘルパー関数
func calculate(n int, memo map[int]int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var result int64
	if n%2 == 0 {
		// n が偶数なら n/2
		result = calculate(n/2, memo)
	} else {
		// n が奇数なら 3n+1
		result = calculate(3*n+1, memo)
	}

	memo[n] = result
	return result
}
