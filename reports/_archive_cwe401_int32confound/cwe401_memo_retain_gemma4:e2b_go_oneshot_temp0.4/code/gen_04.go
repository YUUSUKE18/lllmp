package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	totalCount := int64(0)
	memo := make(map[int]int64)

	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			totalCount += 0
			continue
		}

		// メモ化された値があればそれを使用
		if count, ok := memo[n]; ok {
			totalCount += count
			continue
		}

		// 再帰的計算とメモ化
		var count int64
		if n%2 == 0 {
			// n が偶数なら n/2
			count = count(n/2)
		} else {
			// n が奇数なら 3n+1
			count = count(3*n + 1)
		}

		// 現在のnから1に到達するまでの手数は、次のステップからの手数 + 1
		// ただし、この問題は「1に到達するまでの手数」を求めるため、
		// 遷移の回数を数える必要がある。
		// 遷移の回数を数えるために、再帰の構造を修正する。

		// 1に到達するまでの手数を求めるため、再帰の定義を修正する。
		// count(n) = 1 + count(n/2) if n is even
		// count(n) = 1 + count(3n+1) if n is odd

		// 再帰的な計算を再実行する（メモ化を考慮）
		var calculate func(int) int64
		calculate = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				result = 1 + calculate(k/2)
			} else {
				result = 1 + calculate(3*k+1)
			}

			memo[k] = result
			return result
		}

		count = calculate(n)
		totalCount += count
	}

	fmt.Printf("total=%d\n", totalCount)
}
