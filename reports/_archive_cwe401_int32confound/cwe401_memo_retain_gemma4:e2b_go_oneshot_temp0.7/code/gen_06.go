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

		// メモ化された結果があればそれを使用
		if count, ok := memo[n]; ok {
			totalCount += count
			continue
		}

		// 再帰または反復計算で手数を計算
		currentN := n
		steps := int64(0)
		path := []int{} // 経路を追跡してメモ化に利用

		for currentN != 1 {
			path = append(path, currentN)
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}
		// 1に到達するまでの手数はsteps + 1 (最後の1を含む) ではない。
		// 問題文の「1 に到達するまでの手数」を解釈する。
		// n=1 の手数は 0。
		// n=2 -> 1 (1ステップ)
		// n=3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7ステップ)
		// 1に到達するまでの操作回数を数える。
		// n=2: 2 -> 1 (1回)
		// n=3: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (7回)
		// n=1: 0回
		// ここでは、操作を繰り返して1になったときの操作回数を数える。

		// 再計算して手数を求める（メモ化を最適化する）
		// 経路を辿りながら、重複した計算を避けるため、深さ優先探索とメモ化を組み合わせるか、
		// 単純な再帰＋メモ化が最も安全。

		// 再帰とメモ化による計算
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
				result = calculateSteps(k / 2) + 1
			} else {
				result = calculateSteps(3*k + 1) + 1
			}

			memo[k] = result
			return result
		}

		count := calculateSteps(n)
		totalCount += count
	}

	fmt.Printf("total=%d\n", totalCount)
}
