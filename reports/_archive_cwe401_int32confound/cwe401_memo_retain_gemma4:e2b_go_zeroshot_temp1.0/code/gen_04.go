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
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil || n < 1 {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 再帰的またはループで手数を計算（メモ化付き）
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

			memo[n] = result
			return result
		}

		countVal := count(n)
		total += countVal
	}

	fmt.Printf("total=%d\n", total)
}
