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

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解析を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}
		nInt := int64(n)

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 繰り返し計算関数（再帰とメモ化）
		var count func(n int64) int64
		count = func(n int64) int64 {
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

			// 結果をメモ化して返す
			memo[n] = 1 + result
			return 1 + result
		}

		// 計算実行
		countN := count(nInt)
		total += countN
	}

	// 結果を出力
	fmt.Printf("total=%d\n", total)
}
