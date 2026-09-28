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
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視する
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			totalSteps += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var steps int64 = 0
		currentN := n

		// 1に到達するまでの操作を繰り返す
		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				// メモがあればそこから再開
				steps += memo[currentN]
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			// メモがない場合、現在の操作を記録し、次のステップに進む
			memo[currentN] = steps

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++

			// 再帰的なメモ化を避けるため、ここでは現在のNからの到達数を計算するのではなく、
			// 最終的な1への到達数を計算するアプローチを採用する。
			// 仕様に従い「n が1に到達するまでの手数」を求めるため、再帰的または反復的に1をゴールとする。

			// ここでは、より効率的なメモ化のために、再帰的な構造を導入するか、
			// 既存の計算結果をベースにする。
			// 仕様を再確認: 「n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
			// これは、Collatz予想に関連する操作であり、手数を数える問題です。
			
			// メモ化の目的を「nから1までの手数」を求めることに絞る。
			// 現在のステップ数と次の値で再帰的に考えるのが自然。
		}
		
		// メモ化戦略の修正：現在のnから1までの手数を求めるため、再帰またはDPで計算する。
		// 今回は、標準入力が独立したクエリであるため、各クエリで計算し、結果を合計する。
		// メモ化は、同じ中間値が再訪された場合に有効。

		// --- 再計算とメモ化の再設計 ---
		
		// 毎回、新しいメモを用意して計算する。
		// 最初に与えられたnから、1に到達するまでの操作回数を数える。
		
		if n == 1 {
			// すでに処理済み
		} else {
			// nから1への手数を計算
			steps = 0
			currentN = n
			
			// このクエリ専用のメモ
			localMemo := make(map[int64]int64)
			localMemo[n] = 0 // n自体は0ステップではない（開始点）

			pathSteps := 0
			
			for currentN != 1 {
				if _, ok := localMemo[currentN]; ok {
					// 既に計算済み
					pathSteps += localMemo[currentN]
					break
				}
				
				// 操作実行
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				pathSteps++
				localMemo[currentN] = pathSteps
			}
			
			if currentN == 1 {
				totalSteps += pathSteps
			}
		}
	}

	// 最終結果の出力
	fmt.Printf("total=%d\n", totalSteps)
}
