package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var total int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行は無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		var count int64 = 0
		currentN := n

		// 1に到達するまでの手数を計算
		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				count += val
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		// 1に到達するまでの手数を再計算してメモ化
		// 実際には、上記のループ内でメモ化を行うべきだが、
		// 仕様が「n が 1 に到達するまでの手数を求め」であり、「操作を繰り返す」ため、
		// これはCollatz数列のステップ数を求める問題（3n+1問題）に酷似している。
		// ここでは、元の問題文を厳密に解釈し、各クエリ n に対して1に到達するまでのステップ数を計算する。
		
		// メモ化のロジックを再設計: 各クエリ n について、nから1に到達するステップ数を求める。
		
		// 再計算（メモ化をより効果的に使うため、ここでは再帰的なメモ化を試みる）
		
		// 既に計算済みの値を使って計算を進める
		// 再帰的メモ化（DFS）で再計算
		var calculateSteps func(k int) int64
		calculateSteps = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var result int64 = 0
			nextN := k

			if nextN%2 == 0 {
				nextN /= 2
			} else {
				nextN = 3*nextN + 1
			}

			// 1ステップ追加して再帰的に呼び出す
			result = 1 + calculateSteps(nextN)
			memo[k] = result
			return result
		}

		steps := calculateSteps(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
