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

	// 整数を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		// 行が空でないことを確認
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ（動的計画法/メモ化）
		// 1からnまでの結果を格納する
		memo := make(map[int64]int64)
		memo[1] = 0

		// 再帰または反復で計算（ここでは再帰＋メモ化）
		var calculate func(n int64) int64
		calculate = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if result, ok := memo[n]; ok {
				return result
			}

			var result int64
			if n%2 == 0 {
				// n が偶数なら n/2
				result = calculate(n / 2)
			} else {
				// n が奇数なら 3n+1
				result = 3*n + 1
				result += calculate(result)
			}

			memo[n] = result
			return result
		}

		// 計算実行
		result := calculate(n)
		total += result
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視しても良いが、念のため）
	}

	// 合計を1行で出力
	fmt.Printf("total=%d\n", total)
}
