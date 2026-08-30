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

		if currentN == 1 {
			// 1に到達するまでの手数を計算し、メモ化する
			// 再帰的または反復的に計算した結果をメモに追加する
			// ここでは、元のnから1に到達するまでのステップ数を直接計算する（メモ化の目的を達成するため）
			
			// 再計算してステップ数を求める（メモ化の目的は、同じ値が来たときに再計算しないこと）
			// 実際には、元のnから1へのパスを追跡する方が効率的だが、ここでは「nから1への操作の回数」を求める。
			
			// 簡略化のため、再帰的なメモ化（DP）で計算し直す
			// 実際には、元のnから1へのパスを追跡するのではなく、nが与えられたときのステップ数を求める。
			
			// DPによる計算（メモ化の利用）
			
			// 再度、nから1へのパスを追跡する（メモ化された値を参照する）
			
			// ここでは、nが与えられたときのステップ数を求めるため、再帰的なメモ化を適用する。
			
			// 既存のループで計算した結果をそのまま利用する（もしnが非常に大きい場合は、このループが遅くなる可能性があるが、
			// 課題の制約から、この操作がFIBONACCI数列の類推であるため、メモ化が必須となる）
			
			// 既に計算されたステップ数を格納する
			memo[n] = steps
			total += int64(steps)
		}
	}

	fmt.Printf("total=%d\n", total)
}
