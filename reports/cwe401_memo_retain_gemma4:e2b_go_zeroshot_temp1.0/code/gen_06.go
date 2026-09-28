package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// メモ化のためのマップ
	memo := make(map[int]int)
	totalCount := 0

	// 標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		// 空行の無視
		if line == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.Atoi(line)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// n が1以上の整数であるという前提
		if n < 1 {
			continue
		}

		// 遷移の計算関数
		var count int
		if n == 1 {
			count = 0
		} else {
			// メモ化された値があればそれを使用
			if val, ok := memo[n]; ok {
				count = val
			} else {
				// 再帰的または反復的に計算
				currentN := n
				steps := 0
				
				// 計算途中の値が64bitに収まることを考慮し、再帰ではなく反復で計算を試みる
				// ただし、memo化を前提とするため、探索時にmemoに存在しない値は計算する
				
				// 3n+1問題の古典的な解法を適用
				for currentN != 1 {
					if _, ok := memo[currentN]; ok {
						// 途中でメモ化された値に到達したら、そこから計算を続ける
						// ただし、ここではその値が到達までの手数を表していると仮定して進める
						// この問題は「1に到達するまでの手数」を求めるため、通常の3n+1問題の解法を適用する
						// ここでは、同じ値が再登場したら、その値がすでに計算済みであるはずなので、直接memoを参照する
						// このループ内では、memoに存在しない値は計算を進める
						
						// memoに存在する場合、それはすでに計算済みなので、その値を使って計算をスキップする
						if steps == 0 {
							// 初回計算がmemoにない場合のみ、計算を続ける
						} else {
							// すでにメモ化されている値であれば、そのメモ化された値を結果とする
							count = memo[currentN]
							break
						}
					}
					
					// 手順の実行
					if currentN%2 == 0 {
						currentN /= 2
					} else {
						currentN = 3*currentN + 1
					}
					steps++
				}
				
				// 最終結果をメモ化
				memo[n] = count
			}
		}

		// 合計に加算
		totalCount += count
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalCount)
}
