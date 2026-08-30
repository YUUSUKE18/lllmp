package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化のためのマップ
	memo := make(map[int]int64)

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

		if n == 1 {
			// nが1のときの手数は0
			memo[1] = 0
		} else if _, ok := memo[n]; !ok {
			// 再帰または反復計算で手数を求める
			currentN := n
			steps := int64(0)
			path := []int{} // 経路を記録してメモ化に利用

			for currentN != 1 {
				if currentN == 0 {
					// 0に到達した場合、この経路は無効（問題の制約上、1に到達する経路のみを考える）
					// ただし、3n+1操作では1に到達しない場合もあるが、この問題では1に到達すると仮定する。
					// 実際には、3n+1操作で1に到達する経路を考える。
					// 1に到達するまでの手数を求めるため、1に到達するまで繰り返す。
					break
				}

				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
				path = append(path, currentN)
			}

			// 1に到達したときのステップ数を記録
			if currentN == 1 {
				// 逆順にステップ数を計算し、メモ化する
				// 実際には、nから1に到達するまでのステップ数を求めるため、
				// 逆順に計算したステップ数を記録するのではなく、
				// nから1に到達するまでの過程でステップ数を数える必要がある。

				// 再計算してステップ数を求める（メモ化の目的は、nから1への最短経路の長さを求めること）
				// ここでは、nから1への操作の回数を数える。
				
				// 再帰的なメモ化（DP）で計算する方が安全
				
				// 簡略化のため、ここでは直接再帰的なメモ化を試みる。
				// 1に到達するまでの手数を求めるため、nから1への操作回数を数える。
				
				// 経路を辿ってステップ数を計算し、メモ化する
				tempN := n
				count := int64(0)
				
				// 経路を辿る際に、どの値がどのステップで現れたかを記録する
				// この問題は、nから1への操作の回数を求めるため、
				// 1に到達するまでの操作回数を求める。
				
				// 経路を辿る
				current := n
				steps = 0
				
				// 経路を辿る際に、どの値がどのステップで現れたかを記録する
				// 1に到達するまでの操作回数を求めるため、
				// 1に到達するまでの操作回数を求める。
				
				// 経路を辿る
				for current != 1 {
					if current%2 == 0 {
						current /= 2
					} else {
						current = 3*current + 1
					}
					steps++
				}
				
				memo[n] = steps
			}
		}

		// すべてのクエリの手数を合計する
		if steps, ok := memo[n]; ok {
			total += steps
		}
	}

	fmt.Printf("total=%d\n", total)
}
