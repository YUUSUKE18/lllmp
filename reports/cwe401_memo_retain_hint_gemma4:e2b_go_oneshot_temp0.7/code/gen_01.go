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

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var count int64 = 0
		current := n

		for current != 1 {
			if result, ok := memo[current]; ok {
				count += result
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}

		// 1に到達したときのステップ数を計算し、メモ化
		// この問題は、各クエリ n について、1 に到達するまでの操作回数を求め、その合計を求める問題です。
		// 各クエリ n について、操作の回数を計算し、その合計を求める必要があります。
		// ここでは、各クエリ n に対する操作回数 (count) を計算します。

		// 再帰/メモ化を正しく適用するために、再帰的な構造で操作回数を計算し、結果をメモ化します。
		// ただし、問題の要求は「n が 1 に到達するまでの手数を求め、その合計を求める」です。
		// これは、各 n に対する操作回数を求めることを意味します。

		// 再度、各 n に対する操作回数を計算するロジックを、メモ化を組み込んで実装します。

		var calculateSteps func(k int64) int64
		memo = make(map[int64]int64)

		calculateSteps = func(k int64) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				// nが偶数なら n/2
				result = calculateSteps(k / 2) + 1
			} else {
				// nが奇数なら 3n+1
				result = calculateSteps(3*k + 1) + 1
			}

			memo[k] = result
			return result
		}

		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
