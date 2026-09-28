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
			count := int64(0)
			totalCount += count
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

		// 現在のnから1に到達する手数は、次のステップの手数に1を加える
		// ただし、これは再帰的な呼び出しの構造を考慮する必要がある。
		// ここでは、nから1に到達するまでのステップ数を計算する。
		// 1に到達するまでの手数を求める問題は、通常、nが1になるまでの操作回数を数える。

		// 再帰的な定義を修正し、nから1へのパスを数える
		// nが1の場合、手数は0。
		// n > 1 の場合、
		// nが偶数なら n/2 から1への手数 + 1
		// nが奇数なら 3n+1 から1への手数 + 1

		// 再帰的な計算を再定義し、手数を直接計算する
		// count(n) = 1 + count(n/2) if n is even
		// count(n) = 1 + count(3n+1) if n is odd

		// 再帰的な計算を再実行（メモ化を考慮）
		var steps int64 = 0
		currentN := n
		path := []int{}

		// 1に到達するまでのパスを追跡し、重複を避けるためにメモ化を適用する
		// この問題は、各クエリ n について、n -> ... -> 1 に到達するまでの操作回数を求める。
		// したがって、再帰的に計算し、その結果をメモ化する。

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
				result = 1 + calculateSteps(k/2)
			} else {
				// n が奇数なら 3n+1
				result = 1 + calculateSteps(3*k+1)
			}

			memo[k] = result
			return result
		}

		steps = calculateSteps(n)
		totalCount += steps
	}

	fmt.Printf("total=%d\n", totalCount)
}
