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

		// 計算結果をメモ化するマップ
		memo := make(map[int]int)
		memo[1] = 0

		// n が 1 に到達するまでの手数を計算
		currentN := n
		steps := 0
		
		// 再帰または反復計算で、memo化した値を利用して計算
		// ここでは、毎回再計算するのではなく、memo化された値を使って計算を進める
		// ただし、制約上、nが大きくなる可能性があるため、深さを制限するか、
		// サイクルを検出するロジックが必要だが、この問題はユークリッドの互除法と似ており、
		// 1に到達するまでのステップ数を求める問題（3n+1問題）の変形である。
		// 3n+1問題のステップ数を求める標準的なアプローチ（ここではmemoizationを使用）を採用する。
		
		// 各クエリごとに、現在の n から 1 へのステップ数を計算し、合計に加算する。
		
		// nが1に到達するまでのステップを計算する関数（再帰＋メモ化）
		var calculateSteps func(k int) int
		calculateSteps = func(k int) int {
			if k == 1 {
				return 0
			}
			if _, ok := memo[k]; ok {
				return memo[k]
			}

			var steps int
			if k%2 == 0 {
				// n が偶数なら n/2
				steps = calculateSteps(k / 2) + 1
			} else {
				// n が奇数なら 3n+1
				steps = calculateSteps(3*k + 1) + 1
			}

			memo[k] = steps
			return steps
		}

		// 各入力 n に対するステップ数を計算し、合計に加算する
		// 既存のmemoをクリアせず、グローバルなmemoとして利用する。
		// ただし、問題文は「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」とあるため、
		// 全ての結果を一つの大きなメモ化テーブルとして保持するのが最も効率的である。
		
		// ここでは、各入力 n に対する計算結果を個別にメモ化し、その合計を求める。
		// 厳密には、入力セット全体でmemo化を共有し、再帰呼び出しのたびに参照する。
		
		// 再度、計算ロジックを、計算対象のnに対する直接的な手順を追うように変更する。
		
		// nが1に到達するまでの手数を求める（memoを共有）
		
		// 新しい計算のためのメモ化
		localMemo := make(map[int]int)
		localMemo[1] = 0
		
		var solve func(k int) int
		solve = func(k int) int {
			if k == 1 {
				return 0
			}
			if val, ok := localMemo[k]; ok {
				return val
			}
			
			var result int
			if k%2 == 0 {
				// n が偶数なら n/2
				result = solve(k / 2) + 1
			} else {
				// n が奇数なら 3n+1
				result = solve(3*k + 1) + 1
			}
			
			localMemo[k] = result
			return result
		}
		
		steps = solve(n)
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
