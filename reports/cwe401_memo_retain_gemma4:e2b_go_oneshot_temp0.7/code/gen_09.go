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
	memo[1] = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}

		if n <= 0 {
			continue // 1以上の整数が与えられるという前提だが、念のため
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 計算処理（手番の計算）
		currentN := n
		steps := int64(0)
		path := []int{} // 経路を記録してメモ化のために利用

		// 1に到達するまでの過程を追跡
		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// 途中の値が既にメモ化されていれば、その結果を利用して計算を終了
				steps += memo[currentN]
				break
			}

			// 3n+1 または n/2 の操作
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
			path = append(path, currentN)
		}

		// 1に到達したときのステップ数を計算し、経路を遡ってメモ化する
		finalSteps := int64(0)
		tempN := n
		
		// 経路を逆順に辿り、手番を計算
		for _, nextN := range path {
			if nextN == 1 {
				finalSteps++
				break
			}
			
			// 逆操作を考える
			if nextN%2 == 0 { // 元が n/2 だった場合、n = 2*nextN
				tempN = 2 * nextN
			} else { // 元が 3n+1 だった場合、n = (nextN - 1) / 3
				if (nextN-1)%3 != 0 {
					// これは通常発生しないはずだが、安全策
					break
				}
				tempN = (nextN - 1) / 3
			}
		}
		
		// 経路を逆順に辿り、計算したステップ数をメモ化する
		// path[i] は n から 1 に到達するまでの i+1 ステップ後の値。
		// pathの長さが nから1までの遷移回数に対応する。
		
		// 経路追跡とメモ化を再構成する（よりシンプルなメモ化戦略を採用）
		// n から 1 への最短経路（手番）を求める。
		
		// 再計算（DFS/BFS的なメモ化）
		// ここでは、nから1へのステップ数を直接計算し、過程でメモ化する。
		
		// 経路を再構築してステップ数を計算
		currentSteps := int64(0)
		tempN = n
		
		// 経路を記録し、後でメモ化できるようにする
		trace := []int{n}
		
		// 1に到達するまで繰り返す
		for tempN != 1 {
			if tempN == 0 { // 0や負の値が発生した場合の安全策
				break
			}
			
			if tempN%2 == 0 {
				tempN /= 2
			} else {
				tempN = 3*tempN + 1
			}
			currentSteps++
			trace = append(trace, tempN)
		}
		
		// 経路を逆順に辿り、メモ化する
		// traceには n, n/2/3n+1, ..., 1 が含まれる。
		// traceのインデックス i は、 n から i番目の操作後の値に対応する。
		
		// traceは [n, n_1, n_2, ..., 1] の順。
		// trace[0] = n
		// trace[len(trace)-1] = 1
		
		// trace[i] から 1 への手番は len(trace) - 1 - i
		
		// 最終的なステップ数は、traceの長さから 1 を引いたものになる。
		// 例: n=3 -> [3, 10, 5, 1, ...] (もし操作が n/2/3n+1 の順なら)
		// 実際には、n から 1 に到達するまでの遷移回数。
		
		// 経路の長さ（遷移数）は len(trace) - 1
		// 1に到達するまでの手番は len(trace) - 1
		
		steps = int64(len(trace) - 1)
		
		// 経路上の各ノードについて、nからそのノードへの手番をメモ化する
		for i := 0; i < len(trace); i++ {
			node := trace[i]
			if node == 1 {
				memo[node] = 0
			} else {
				// このノードに到達するまでの手番を計算
				// 経路の長さが i の場合、n から i ステップ後の値
				memo[node] = int64(len(trace) - 1 - i)
			}
		}

		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
