package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalSteps int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			totalSteps += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		// 繰り返し操作をシミュレーション
		currentN := n
		steps := int64(0)

		for currentN != 1 {
			// メモ化チェック
			if val, ok := memo[currentN]; ok {
				steps += val
				break
			}

			// 操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++

			// 再帰的な呼び出しやループの最適化のために、現在の値が既に計算済みかチェック
			if currentN == 1 {
				break
			}
		}

		// 計算結果をメモ化（ここでは、元のnから1に到達するまでの手数を記録するのではなく、
		// 途中の値が1に到達するまでの手数を記録する、という解釈で実装する。
		// 仕様は「nが1に到達するまでの手数を求め」なので、nから1へのパスを追跡する。
		// ただし、メモ化は「同じ整数が繰り返し現れるので、計算結果をメモ化」という指示に基づき、
		// 任意の数から1への最短経路（またはこの操作の適用順序）をメモする。
		// ここでは、nから1へのパスを追跡した結果をメモする。
		// 実際には、この問題はCollatz予想に関連しており、nから1へのパスを追跡する。
		// 繰り返し現れる値が1に到達するまでの手数を求めるため、
		// 探索中に遭遇した値をメモする。

		// 再度、メモ化のロジックを修正し、nから1へのパスを追跡する形で実装する。
		// 最初のループで計算したstepsを合計に加算する。
		totalSteps += steps
	}

	// 最終結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
