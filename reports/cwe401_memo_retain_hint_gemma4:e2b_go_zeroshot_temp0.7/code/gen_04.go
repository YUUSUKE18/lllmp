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
	var totalCount int64 = 0

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

		// メモ化のためのマップ（動的計画法/メモ化）
		// 計算結果を保存する
		memo := make(map[int]int64)

		// 再帰的な関数で手数を計算する（メモ化を適用）
		var count func(n int) int64
		count = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// n が偶数なら n/2
				result = count(n / 2)
			} else {
				// n が奇数なら 3n+1
				result = count(3*n + 1)
			}

			// メモに結果を保存
			memo[n] = result
			return result
		}

		// 計算実行
		countResult := count(n)
		totalCount += countResult
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalCount)
}
