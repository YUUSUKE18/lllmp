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
			continue // 整数として解釈できない行は無視
		}

		if n == 1 {
			// nが1のときの手数は0
			// total += 0
		} else {
			// 置き換え操作のシミュレーションとメモ化
			// 1に到達するまでの手数を求める
			memo := make(map[int]int64)
			memo[1] = 0

			currentN := n
			steps := int64(0)

			for currentN != 1 {
				if _, ok := memo[currentN]; ok {
					// メモがあればスキップ
					steps += memo[currentN]
					currentN = 1 // 終了
					break
				}

				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
			}
			
			// 1に到達するまでの手数を求める（再帰的なメモ化を適用する）
			// ここでは、元の問題の意図を「nから1に到達するまでの操作回数」と解釈し、
			// 置き換え操作を逆算するのではなく、与えられた操作を繰り返す過程で1に到達するまでの回数を数える、という解釈で進める。
			// ただし、問題文の「nが偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます」は、
			// 1に到達するまでの操作回数を求めるという、Collatz予想に関連する操作を指していると解釈します。

			// メモ化を再構築して、nから1への最短経路を求める
			
			// 実行時のメモ化（再帰的なメモ化）
			// 実際には、すべてのクエリに対する計算を最適化するため、
			// 必要な値が計算されたら保存する。
			
			// ここでは、各クエリ n について、nから1への操作回数を計算し、合計する。
			// メモ化は、同じ中間値が何度も現れる場合に適用する。
			
			// 簡略化のため、各クエリで直接計算し、メモ化は再帰的な構造を考慮して適用する。
			
			// 再帰的なメモ化を適用した計算（Collatzのステップ数計算）
			
			// 1に到達するまでの手数を求める
			
			// 実行時のメモ化を再定義
			memo = make(map[int]int64)
			memo[1] = 0
			
			currentN = n
			steps = 0
			path := []int{} // 経路を記録する

			for currentN != 1 {
				if _, ok := memo[currentN]; ok {
					// 既に計算済み
					steps += memo[currentN]
					// 経路を遡って現在のステップ数を更新する（このアプローチは複雑になるため、単純な再帰呼び出しで十分）
					break
				}
				
				path = append(path, currentN)
				
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
			}
			
			// 経路を遡ってメモ化を更新
			// 最終的なステップ数は、nから1への経路の長さとなる。
			// 経路を記録したリストを逆順に処理してメモ化する
			
			// 経路を逆順に処理してメモ化を更新
			for i := len(path) - 1; i >= 0; i-- {
				val := path[i]
				// 1に到達するまでのステップ数を計算し、現在の値に加算する
				if _, ok := memo[val]; !ok {
					// 1に到達するまでのステップ数を計算 (現在の経路長 + memo[next_val])
					nextVal := 1
					subSteps := 0
					temp := val
					for temp != 1 {
						if temp%2 == 0 {
							temp /= 2
						} else {
							temp = 3*temp + 1
						}
						subSteps++
					}
					memo[val] = subSteps
				}
			}
			
			// 最終的なステップ数を取得
			finalSteps := memo[n]
			total += finalSteps
		}
	}

	fmt.Printf("total=%d\n", total)
}
