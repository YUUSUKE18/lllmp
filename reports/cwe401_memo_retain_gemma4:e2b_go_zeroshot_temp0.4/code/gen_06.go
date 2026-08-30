package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

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

		// nが1以上の整数であるという制約
		if n < 1 {
			continue
		}

		// 再帰的または反復的に手数を計算する関数（メモ化付き）
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
				// nが偶数なら n/2
				result = count(n / 2)
			} else {
				// nが奇数なら 3n+1
				result = count(3*n + 1)
			}

			// メモ化
			memo[n] = result
			return result
		}

		// クエリ n の手数を計算
		handSteps := count(n)
		total += handSteps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}
