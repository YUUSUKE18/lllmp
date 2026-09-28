package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
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

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// 再帰的計算とメモ化
		var count int64 = 0
		currentN := n

		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				count += val
				currentN = 1 // 1に到達したとみなしてループを抜ける
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}
		
		// 1に到達した後の手数を加算 (nが1の場合は0)
		if currentN == 1 {
			// 1に到達するまでの操作回数を計算する。
			// ここでの「手数」は、nから1に到達するまでの操作回数と解釈する。
			// n=1の場合は0。
			
			// 再計算して、memoを更新する
			tempN := n
			steps := 0
			path := []int{}

			for tempN != 1 {
				if val, ok := memo[tempN]; ok {
					steps += val
					break
				}
				
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				path = append(path, tempN)
				steps++
			}
			
			// 1に到達したときのステップ数を計算し、メモに保存する
			// ここでは、nから1に到達するまでの操作回数を求める。
			// 実際には、nが与えられたときのステップ数を求めるため、再帰的なメモ化の方が適切。
			
			// 単純な繰り返し計算で、nから1までのステップ数を求める
			
			// 再度、nから1までのステップ数を計算し、memoに保存する
			
			// 最初にnが与えられたときのステップ数を求める
			var stepsToOne int64 = 0
			temp := n
			
			// 状態を記録してサイクルを検出する（今回は1に到達する問題なので、単純な到達回数を数える）
			// 実際には、各nについて、そのnから1への最短経路（操作の回数）を求める。
			
			// 状態: n -> 1 の経路
			
			// 既に計算済みの値があればそれを使う
			if val, ok := memo[n]; ok {
				total += val
			} else {
				// まだ計算されていない場合、nから1への経路を計算する
				
				// 経路探索（この問題は通常、nから1への経路を求める）
				// しかし、問題文の要求は「nが1に到達するまでの手数を求め」なので、
				// nが与えられたときの「n -> 1」の操作回数を求める。
				
				// BFS/DPで計算するのが最も正確だが、ここではメモ化の構造を維持する。
				
				// 簡略化のため、再帰的なメモ化を再構築する。
				// nが与えられたときの「nから1への操作回数」を求める。
				
				// ここでは、nが与えられたときの「nから1への操作回数」を求める。
				
				// memo[n] = (n -> 1 の手数)
				
				// 1に到達するまでの手数を再帰的に計算し、メモする
				
				// 状態の定義: f(n) = nが1になるまでの操作回数
				
				// 1に到達したときの値を計算し、メモする
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
				
				// 最初のクエリ n について計算
				stepsToOne = calculateSteps(n)
				total += stepsToOne
			}
		}
	}

	fmt.Printf("total=%d\n", total)
}
