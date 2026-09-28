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

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculateMoves func(n int64) int64
		calculateMoves = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// n が偶数なら n/2
				result = calculateMoves(n / 2)
			} else {
				// n が奇数なら 3n+1
				result = 3*n + 1
				result += calculateMoves(result)
			}

			memo[n] = result
			return result
		}

		// クエリ n の手数を計算
		moves := calculateMoves(n)
		total += moves
	}

	if err := scanner.Err(); err != nil {
		// エラー処理が必要な場合はここで行うが、本問では無視しても良い
	}

	fmt.Printf("total=%d\n", total)
}
