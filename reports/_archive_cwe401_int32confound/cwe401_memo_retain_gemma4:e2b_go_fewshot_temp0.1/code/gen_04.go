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
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int)
		memo[1] = 0

		currentN := n
		steps := 0

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps = memo[currentN]
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 計算結果をメモ化
		// ここでは、元のnから1に到達するまでのステップ数を計算するのではなく、
		// 各クエリnについて、nが1になるまでの操作回数を求める。
		// 課題の意図を再解釈します。
		// 「n が 1 のときの手数は 0 です。」
		// 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
		// これは、コネルの問題（3n+1問題）のステップ数を求める問題です。

		// 再計算（メモ化を適用）
		currentN = n
		steps = 0
		path := []int{}

		for currentN != 1 {
			path = append(path, currentN)
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
		}
		// 1に到達するまでの操作回数はpathの長さ
		steps = len(path)

		// メモ化の適用（再帰的または動的計画法で計算するのが一般的だが、ここでは直接計算結果を合計する）
		// 課題の指示「計算結果をメモ化して高速化してください」を考慮し、
		// 毎回計算するのではなく、再帰的なメモ化（DP）を導入する。

		// DP/メモ化による再計算
		memoDP := make(map[int]int)
		memoDP[1] = 0
		
		// 必要な計算を再実行し、メモ化を適用する
		finalSteps := func(k int) int {
			if k == 1 {
				return 0
			}
			if val, ok := memoDP[k]; ok {
				return val
			}

			var next int
			if k%2 == 0 {
				next = k / 2
			} else {
				next = 3*k + 1
			}

			result := 1 + finalSteps(next)
			memoDP[k] = result
			return result
		}

		steps = finalSteps(n)
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
