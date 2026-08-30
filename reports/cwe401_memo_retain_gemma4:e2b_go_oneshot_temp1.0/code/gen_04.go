package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化テーブル
	memo := make(map[int]int64)

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
			// nが1のときの手数は0
			continue
		}

		// 再帰的/メモ化再帰で手数を計算
		var count int64 = 0
		current := n
		path := []int{} // 経路を追跡して、同じ経路で計算を分けるために利用する（今回は単なるカウントのみなので省略可能だが、メモ化のロジックを明確にする）

		for current != 1 {
			if val, found := memo[current]; found {
				count += val
				break
			}

			// 繰り返し操作の適用
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}

		// 計算された手数をメモ化（ここでは直接結果を計算して加算する方式を採用し、メモ化は中間結果の最適化として考える）
		// しかし、仕様は「操作を繰り返し、1に到達するまでの手数を求める」ので、これはフィボナッチ数列的な問題（コネルの問題）であり、逆操作でメモ化するのが一般的だが、ここでは直接計算し、メモ化を適用する。

		// 再度、メモ化された値を使用して合計を計算し直す（DP的なアプローチ）
		// この問題は、nを1にするまでの操作の回数を求める問題なので、nから1に向かって計算する。

		// DP/メモ化再帰による計算を再構成
		// ここでは、nから1への最短経路を求めるため、nを直接計算する。

		// メモ化された値が存在しない場合、再帰的に計算する
		var calculateSteps func(k int) int64
		calculateSteps = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, found := memo[k]; found {
				return val
			}

			var result int64
			if k%2 == 0 {
				result = calculateSteps(k / 2) + 1
			} else {
				result = calculateSteps(3*k+1) + 1
			}

			memo[k] = result
			return result
		}

		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
