package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

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

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 繰り返し計算関数（メモ化付き）
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

		// 計算実行
		countVal := count(n)
		total += countVal
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}
