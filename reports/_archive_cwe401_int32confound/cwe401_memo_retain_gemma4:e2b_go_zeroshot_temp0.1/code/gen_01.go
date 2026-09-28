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

		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

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

			memo[n] = result
			return result
		}

		// 計算実行
		result := count(n)
		total += result
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}
