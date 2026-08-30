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
		var n int
		_, err := fmt.Sscanf(scanner.Text(), "%d", &n)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)
		memo[1] = 0

		currentN := n
		count := 0

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// メモがあればスキップ
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
		}

		// 遷移計算とメモ化
		// 逆順に計算してメモ化する方が効率的だが、ここでは直接計算して合計に加算する
		// 実際には、同じ値が何度も現れるため、再帰的なメモ化（またはループ内でのメモ化）が必要
		
		// 再帰的なメモ化（ここでは簡略化のため、ループ内で直接計算結果をmemoに追加する）
		// 厳密には、nが大きくなる可能性があるため、再帰またはDPでメモ化するのが標準的。
		// この問題はコネルの予想（3n+1問題）の変種であり、nが1に到達するまでのステップ数を求める。
		
		// 再計算の代わりに、計算過程でmemoを更新するロジックを採用する。
		
		// 簡略化のため、ここでは再帰的なメモ化の考え方を適用し、
		// 遷移を辿りながら合計を計算する。
		
		// 最終的な手数を求めるための再帰関数（メモ化付き）を定義する
		var calculateSteps func(k int) int64
		calculateSteps = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memo[k]; ok {
				return val
			}

			var steps int64
			if k%2 == 0 {
				steps = 1 + calculateSteps(k/2)
			} else {
				steps = 1 + calculateSteps(3*k+1)
			}
			memo[k] = steps
			return steps
		}

		steps := calculateSteps(n)
		total += steps
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
	}

	fmt.Printf("total=%d\n", total)
}
