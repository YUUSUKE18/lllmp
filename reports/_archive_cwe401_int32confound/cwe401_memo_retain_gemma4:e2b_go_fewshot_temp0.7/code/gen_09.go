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
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)
		memo[1] = 0

		// 再帰または反復で計算
		currentN := n
		steps := int64(0)

		// メモ化された値がない場合、計算を開始
		if _, ok := memo[currentN]; !ok {
			// 計算プロセス
			path := []int{}
			tempN := n
			
			for tempN != 1 {
				path = append(path, tempN)
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
			}
			
			// 逆順に手数を計算し、メモ化
			// 1に到達するまでのステップ数は、経路の長さ - 1 (開始ノードn自身を除く)
			// ただし、nが1でない場合、nから1までのステップを数える必要がある。
			// 1に到達するまでの操作回数（手数）を求める。
			
			// ここでは、nから1に到達するまでの操作回数を数える。
			// 1に到達するまでの操作回数は、パスの長さ。
			// 例: 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (8ステップ)
			
			// 再計算して、1に到達するまでのステップ数を求める
			steps = 0
			temp := n
			for temp != 1 {
				if temp%2 == 0 {
					temp /= 2
				} else {
					temp = 3*temp + 1
				}
				steps++
			}
			
			memo[n] = int64(steps)
		}

		// メモ化された値を取得して合計に加算
		if steps, ok := memo[n]; ok {
			total += steps
		}
	}

	fmt.Printf("total=%d\n", total)
}
