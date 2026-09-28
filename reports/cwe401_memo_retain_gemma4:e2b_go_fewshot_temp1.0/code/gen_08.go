package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	var total int64 = 0

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}

		// 空行を無視
		if len(line) == 0 {
			continue
		}

		// 行から整数を抽出
		var n int64
		_, err = fmt.Sscanf(line, "%d", &n)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ (memoization)
		// 64bit整数として扱われるため、map[int64]int64 を使用
		memo := make(map[int64]int64)

		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if result, ok := memo[n]; ok {
				return result
			}

			var steps int64
			if n%2 == 0 {
				// n が偶数なら n/2
				steps = calculateSteps(n / 2) + 1
			} else {
				// n が奇数なら 3n+1
				steps = calculateSteps(3*n + 1) + 1
			}

			memo[n] = steps
			return steps
		}

		// 各クエリに対して計算を実行し、合計に加算
		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
