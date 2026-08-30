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

		var count int64 = 0
		current := n

		for current != 1 {
			if val, ok := memo[current]; ok {
				count += val
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			memo[n] = count // 最初のnに対する計算結果を保存
		}

		// 1に到達するまでの手数を計算し、合計に加算する
		// 再帰的/動的計画法的に考えると、nが与えられたときのステップ数を求める
		// ここでは、nが与えられたときの1回の操作の回数を数える
		
		// 再計算して、nから1に到達するまでのステップ数を求める（メモ化を利用して）
		steps := int64(0)
		temp := n
		for temp != 1 {
			if val, ok := memo[temp]; ok {
				steps += val
				break
			}
			
			if temp%2 == 0 {
				temp /= 2
			} else {
				temp = 3*temp + 1
			}
		}
		
		// 1に到達するまでの手数を求める（再帰的な構造を考慮して、ここでは単一の経路の長さが求められると解釈する）
		// 課題の意図は、nが与えられたときの操作回数を求めること。
		// 1からnに逆算するのではなく、nから1に向かって操作を繰り返す回数を数える。

		// 再帰的な解釈に基づいて、nが与えられたときの操作回数を計算する
		// 1からnへの逆操作を考えると、これは非常に複雑になるため、与えられた操作のパスを辿る。
		
		// 簡単化のため、元の問題文の操作をそのまま適用し、1に到達するまでのステップを数える。
		// 課題の文脈から、これは列ニアの問題（Collatz conjecture）の手数数を求めることを示唆している。
		
		// nが与えられたときの操作回数を計算し、メモ化を適用する。
		
		// 再計算（メモ化を利用して）
		current_steps := int64(0)
		current_val := n
		
		// 1からnへの逆操作ではなく、nから1への操作回数を数える
		// 1に到達するまでの「手数」は、nが与えられたときの操作の回数。
		
		// 再帰的なメモ化（DP）で計算し直す
		
		// 既にmemoにnの計算結果があるか確認
		if _, ok := memo[n]; !ok {
			// nから1へのパスを辿ってステップ数を計算する
			path := []int64{n}
			temp = n
			
			for temp != 1 {
				if temp%2 == 0 {
					temp /= 2
				} else {
					temp = 3*temp + 1
				}
				path = append(path, temp)
			}
			
			// 1に到達するまでのステップ数はパスの長さ - 1 (最初のn自身を除く)
			// ただし、n=1の場合は0ステップ。
			
			// 実際に1に到達するまでのステップ数を数える
			steps_count := int64(0)
			current_val = n
			for current_val != 1 {
				if current_val%2 == 0 {
					current_val /= 2
				} else {
					current_val = 3*current_val + 1
				}
				steps_count++
			}
			
			total += steps_count
			memo[n] = steps_count
		} else {
			// 既に計算済みの場合、メモ化された値を加算する
			total += memo[n]
		}
	}

	fmt.Printf("total=%d\n", total)
}
