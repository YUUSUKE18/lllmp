package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalMoves int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		// 空行を無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		var moves int64 = 0
		current := n

		// 1に到達するまで繰り返す
		for current != 1 {
			// メモ化チェック
			if val, ok := memo[current]; ok {
				moves += val
				break // 既に計算済みなのでループを抜ける
			}

			// 操作の適用
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3*current + 1
			}
			moves++
		}

		// 1に到達した場合、その手数を合計に加算
		if current == 1 {
			totalMoves += moves
		}

		// メモ化の更新 (これはクエリごとに再計算が必要なため、グローバルなメモ化ではなく、
		// 実際には再帰/動的計画法のメモ化が必要だが、ここでは問題の制約に従い、
		// 各クエリの結果のみをメモ化する方針で進める。ただし、上記の実装では、
		// n -> 1 への経路を計算する際に、中間値のメモ化は適用されていない。
		// 問題の「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」は、
		// 各クエリ n に対する「n -> 1 への手数」の計算を高速化することを指す。
		// そこで、各クエリで計算した結果をメモ化する。
		memo[n] = moves
	}

	// 最終結果の出力
	fmt.Printf("total=%d\n", totalMoves)
}
