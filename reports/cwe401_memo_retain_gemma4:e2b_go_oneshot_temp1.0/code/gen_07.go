package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// 繰り返し計算をメモ化するためのマップ
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰的な計算とメモ化
		if n == 1 {
			memo[1] = 0
		} else if n%2 == 0 {
			// n が偶数なら n/2
			result := calculate(n/2, memo)
			memo[n] = 1 + result
		} else {
			// n が奇数なら 3n+1
			result := calculate(3*n+1, memo)
			memo[n] = 1 + result
		}
		total += memo[n]
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（この問題の制約上、通常は不要だが念のため）
	}

	fmt.Printf("total=%d\n", total)
}

// calculate は再帰的計算を補助する関数。メモ化された結果を引数として受け取る。
// ただし、この問題の仕様では、元の値を計算する過程で、その値が1に到達するまでのステップ数を求めるため、
// 構造を再考し、標準的なメモ化再帰で実装し直す。
// 1に到達するまでの手数を求めるため、再帰の呼び出し自体が1ステップを意味するようにする。

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

	// 1ステップを加算する
	memo[n] = 1 + result
	return memo[n]
}
