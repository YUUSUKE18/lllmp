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

	// メモ化テーブル (map[int64]int64): nから1に到達するまでの手数
	memo := make(map[int64]int64)
	memo[1] = 0

	for scanner.Scan() {
		line := scanner.Text()
		// 空行または整数として解釈できない行は無視
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		// 再帰的・動的計画法的な計算とメモ化
		if _, ok := memo[n]; !ok {
			currentN := n
			path := []int64{}
			// 1に到達するまでのパスを探索
			for currentN != 1 {
				if currentN == 0 { // 0は到達不可（またはスキップ）
					break
				}
				path = append(path, currentN)
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
			}

			if currentN == 1 {
				// 1に到達するまでの手数はパスの長さ + 1 (スタートのnを含む)
				// または、操作回数を数える:
				// 実際には、nから1に到達するまでのステップ数を数える。
				// 1に到達するまでの操作回数を計算する。
				// n -> ... -> 1
				// ここでは、nから始めて1に到達するのに必要なステップ数を数える。
				// 1に到達するまでの操作回数（手数）は、memo[n]に格納する。
				// 遷移を逆向きに辿って、nから1への道のりを計算するのではなく、
				// nがmemoに存在しない場合のみ再帰的に計算し、その結果をメモする。

				// ここでは、nから1への最短経路をメモ化する（非自明なケース）
				// 逆向きに辿って、nがどの数から来たかを特定する方が効率的だが、
				// 問題の構造上、n -> f(n) という一方向の遷移を効率的に扱うため、
				// 逆に到達可能な経路を探索する。

				// 効率化のため、nから1への経路を再帰的に辿ることで、memo化を試みる。
				// この問題は、カントール・ラシュノ（Collatz conjecture）に関連しており、
				// 常に1に収束すると仮定される。

				// 再帰的に計算し、経路上の各ノードの「手数」を計算する。
				// memo[n] = 1 + memo[f(n)]
				var calculateSteps func(k int64) int64
				calculateSteps = func(k int64) int64 {
					if k == 1 {
						return 0
					}
					if val, ok := memo[k]; ok {
						return val
					}

					next := k
					if k%2 == 0 {
						next = k / 2
					} else {
						next = 3*k + 1
					}

					result := 1 + calculateSteps(next)
					memo[k] = result
					return result
				}

				steps := calculateSteps(n)
				total += steps
			}
		}
	}

	fmt.Printf("total=%d\n", total)
}
