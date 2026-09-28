package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 入力を読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

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

		// 状態の計算関数（メモ化付き）
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

			// メモ化
			memo[n] = result
			return result
		}

		// クエリ n について計算を実行
		total += count(n)
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}
