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

		// 経路探索とメモ化
		var count int64 = 0
		current := n
		visited := make(map[int64]int64) // 経路を記録するためのマップ

		for current != 1 {
			if current == 1 {
				break
			}
			if _, ok := memo[current]; ok {
				count += memo[current]
				break
			}

			// 現在の値を処理する前に、先に1への最短経路を探索する
			// この問題は、各数から1への経路を求めるのではなく、
			// 各クエリで計算される「手数」を求める問題であり、
			// nから1に到達するまでの操作の回数を求める問題である。
			// 厳密には、操作の回数を求めるため、再帰または動的計画法で解く必要がある。

			// ここでは、nから1への操作回数を求める。
			// nが偶数なら n/2、奇数なら 3n+1。
			// 1への到達を考えるため、nが1以上の整数に対して再帰的に考える。

			// nが1の場合の手数は0 (既に終了条件)
			if current == 1 {
				break
			}

			// メモ化された値があるかチェック
			if val, ok := memo[current]; ok {
				count += val
				break
			}

			// 次のステップの計算
			if current%2 == 0 {
				next := current / 2
				// 遷移を記録
				visited[current] = next
				current = next
			} else {
				next := 3*current + 1
				// 遷移を記録
				visited[current] = next
				current = next
			}
			// この問題は、各クエリnに対して1への到達までの操作回数を求める必要がある。
			// その操作回数を計算する過程でメモ化を行う。
		}

		// 実際には、各nについて1への到達までの操作回数を計算し、合計する。
		// 独立した計算として各nを処理する。

		// 独立した計算とメモ化を再構築する。
		// 各nに対して1への到達までの手数 (h(n)) を求める。
		// h(1) = 0
		// h(n) = h(n/2) + 1 (nが偶数)
		// h(n) = h(3n+1) + 1 (nが奇数)

		// 1回のクエリnに対する計算を再実行する（再帰またはDPでメモ化）
		
		// 毎回独立して計算する（メモ化は全体にわたる）
		
		// スタックベースでの再計算とメモ化
		
		if n != 1 {
			// 1への到達までの手数を求める関数を定義する
			var calculateSteps func(k int64) int64
			calculateSteps = func(k int64) int64 {
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
					result = calculateSteps(3*k+1) + 1
				}

				memo[k] = result
				return result
			}

			steps := calculateSteps(n)
			total += steps
		}
	}

	fmt.Printf("total=%d\n", total)
}
