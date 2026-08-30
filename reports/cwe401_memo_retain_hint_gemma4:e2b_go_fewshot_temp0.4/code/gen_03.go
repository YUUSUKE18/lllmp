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

		// 再帰的または反復的に操作をシミュレーションし、メモ化を利用する
		currentN := n
		count := int64(0)

		// 1に到達するまでの手数を計算
		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// メモがあればスキップ
				count += memo[currentN]
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			// 操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		// 1に到達したときのコストをメモに追加
		if currentN == 1 {
			// 1に到達するまでの手数を計算し、それをメモする
			// ここでの「手数」は、元のnから1に到達するまでのステップ数ではなく、
			// nから操作を繰り返して1に到達するまでのステップ数を意味する。
			// 課題の意図を再解釈: 各クエリnについて、nから操作を繰り返して1に到達するまでの手数を求め、その合計を求める。
			// したがって、nから1への経路の長さを計算する。
			
			// 再計算: nから1への経路長を計算する
			tempN := n
			steps := int64(0)
			
			// 経路を追跡し、メモ化を更新する
			path := []int{}
			visited := make(map[int]int64)
			
			for tempN != 1 {
				if tempN == 1 {
					break
				}
				
				if val, ok := visited[tempN]; ok {
					// 既に計算済みの経路があれば、その分を足し合わせる
					steps += val
					tempN = 1 // 経路を終了
					break
				}
				
				// 再帰的な計算を避けるため、ここでは単純に操作を繰り返す
				// 実際には、nから1への経路長を求める問題は、nがFibonacci関連の問題（コネルの問題）に似ているが、
				// ここでは操作の回数を数えるため、単純に操作を繰り返す。
				
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				steps++
				path = append(path, tempN)
				visited[tempN] = steps // このステップ数で記録
			}
			
			// 1に到達するまでの手数を計算し、メモに保存
			if tempN == 1 {
				memo[n] = steps
			}
			
			total += steps
		}
	}

	fmt.Printf("total=%d\n", total)
}
