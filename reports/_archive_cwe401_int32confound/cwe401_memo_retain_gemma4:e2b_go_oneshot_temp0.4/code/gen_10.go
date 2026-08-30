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
			if val, ok := memo[current]; ok {
				count += val
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
			memo[n] = count // ここではnをキーとして記録するのではなく、現在の値の遷移をメモ化する方が効率的だが、
			              // 問題の要求は「nが1に到達するまでの手数」なので、nから1へのパスをメモ化する。
			              // ここでは、現在の値から1への手数を計算する過程をメモ化する。
		}

		// 再帰的または動的計画法で、nから1への手数を計算し、その合計を求める。
		// メモ化をより適切に行うため、再計算を避けるための関数を導入する。

		// 再度、メモ化を再設計する。
		// nから1への手数を計算する関数を定義し、その中でメモ化を行う。
		// 全てのクエリに対して、この関数を呼び出す。

		// 既存のループ構造を維持しつつ、メモ化を適用する。
		// nが1に到達するまでの手数を計算する関数を定義し、それを呼び出す。
		// 繰り返し現れる値があるので、全体で共有するメモ化が必要。

		// 外部でメモ化を管理する
		memoFinal := make(map[int64]int64)

		var calculateSteps func(k int64) int64
		calculateSteps = func(k int64) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memoFinal[k]; ok {
				return val
			}

			var result int64
			if k%2 == 0 {
				result = calculateSteps(k / 2) + 1
			} else {
				result = calculateSteps(3*k + 1) + 1
			}

			memoFinal[k] = result
			return result
		}

		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
