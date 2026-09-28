package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalSteps int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			// totalSteps += 0 // 0を加算しても結果は変わらないが、ここでは明示的に加算しない
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var count func(n int64) int64
		count = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if result, ok := memo[n]; ok {
				return result
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = count(n / 2) + 1
			} else {
				// n が奇数なら 3n+1
				steps = count(3*n + 1) + 1
			}

			memo[n] = steps
			return steps
		}

		// 計算と合計の更新
		steps := count(n)
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}
