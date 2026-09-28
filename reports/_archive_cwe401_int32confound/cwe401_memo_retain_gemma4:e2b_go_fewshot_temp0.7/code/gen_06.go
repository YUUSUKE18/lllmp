package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)
		memo[1] = 0

		var count int64 = 0
		current := n

		for current != 1 {
			var steps int64
			if current%2 == 0 {
				// n が偶数なら n/2
				current /= 2
			} else {
				// n が奇数なら 3n+1
				current = 3*current + 1
			}
			count++
		}

		// ここでは、クエリ n から 1 に到達するまでの手数を求める。
		// 問題文の「操作を繰り返し、1 に到達するまでの手数を求めます」は、
		// 1回の操作で1に到達するまでのステップ数を指していると解釈する。

		// 再度、メモ化と再帰的なアプローチで、クエリ n から 1 への最短ステップ数を計算する。
		// ただし、メモ化はグローバルに保持する必要がある。

		// 状態 (n) から 1 へのステップ数を計算する関数を定義し、メモ化を適用する。
		var calculateSteps func(k int) int64
		calculateSteps = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				// n が偶数なら n/2
				result = calculateSteps(k / 2)
			} else {
				// n が奇数なら 3n+1
				result = 1 + calculateSteps(3*k + 1)
			}

			memo[k] = result
			return result
		}

		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
