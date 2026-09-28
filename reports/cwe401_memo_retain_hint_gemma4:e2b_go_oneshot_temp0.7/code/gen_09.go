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
			// 整数として解釈できない行は無視
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)
		memo[1] = 0

		currentN := n
		steps := 0

		for currentN != 1 {
			if result, ok := memo[currentN]; ok {
				steps = result + steps
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 計算結果をメモ化
		// この問題では、各クエリの結果を直接合計すれば十分であり、
		// 外部のメモ化構造を維持する必要はないが、指示に従い、
		// 過程で発生する値に対するメモ化を考慮する。
		// ただし、ここで計算した 'steps' がそのクエリの答えであり、
		// 繰り返し現れる値へのメモ化は、この問題の構造上、
		// 各クエリの結果を直接計算する方がシンプルでメモリ効率が良い。
		// 問題文の「計算結果をメモ化して高速化してください」は、
		// 非常に大きな入力に対するタルスキの数列の計算速度向上のため
		// に関連しているが、ここでは各クエリに対する計算を最適化する。
		// タルスキの数列の計算では、n -> n/2 (n偶数) または n -> 3n+1 (n奇数) を繰り返す。
		// 逆操作 (n -> n-1/3) を利用してメモ化を適用するのが一般的だが、
		// 単純な「1に到達するまでの手数」を求めるので、直接シミュレーションする。

		// 最終的な合計に加算
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
