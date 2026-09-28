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
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		// メモ化テーブル
		memo := make(map[int64]int64)

		var calculate func(n int64) int64
		calculate = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// n が偶数なら n/2
				result = calculate(n / 2) + 1
			} else {
				// n が奇数なら 3n+1
				result = calculate(3*n + 1) + 1
			}

			memo[n] = result
			return result
		}

		// 再帰呼び出しの前に、現在のnに対する計算を実行
		// ただし、再帰呼び出しの中で再計算を防ぐため、このループ全体を効率化する必要がある。
		// 問題の要求は「各クエリ n について、操作を繰り返し、1 に到達するまでの手数を求める」こと。
		// これは、n から 1 へのパスの長さを求める問題であり、通常は再帰または動的計画法で解かれる。

		// ここでは、各クエリ n に対して、n から 1 へのパスの長さを求める。
		// 1 に到達するまでの手数を求めるため、操作の「回数」を数える。

		// 再帰的に考える場合、
		// f(n) = 1 + f(n/2) (nが偶数)
		// f(n) = 1 + f(3n+1) (nが奇数)
		// f(1) = 0

		// 最初に読み込んだ n に対して計算を行う
		cost := calculate(n)
		total += cost
	}

	fmt.Printf("total=%d\n", total)
}
