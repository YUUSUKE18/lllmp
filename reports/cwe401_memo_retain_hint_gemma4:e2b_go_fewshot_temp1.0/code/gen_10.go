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

		if n == 1 {
			// nが1のときの手数は0
			// 1という値が現在のクエリの結果として得られた場合の遷移は0
			// しかし、問題の操作はnを操作することなので、ここではnが1になった場合の「手数」は0として扱われる。
			// 後の処理でnが1になった場合に0を加算する。
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var steps int64
			if n%2 == 0 {
				// nが偶数なら n/2
				steps = calculateSteps(n / 2) + 1
			} else {
				// nが奇数なら 3n+1
				steps = calculateSteps(3*n + 1) + 1
			}

			memo[n] = steps
			return steps
		}

		// 再帰的に計算し、結果を合計に加算
		steps := calculateSteps(n)
		total += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理は省略するが、本番では考慮すべき
	}

	fmt.Printf("total=%d\n", total)
}
