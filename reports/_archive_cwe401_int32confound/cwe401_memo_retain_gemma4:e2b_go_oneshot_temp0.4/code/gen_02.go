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
			count++
			memo[n] = count // nから始まった場合の計算結果をメモするのではなく、現在の経路を追跡する
		}
		// 1に到達するまでの手数を計算し、合計に加算する
		// 再帰的なメモ化（またはDP）を導入して、各nから1への最短経路を計算する
		// ここでは、与えられたnから1へのパスの長さを計算する
		
		// 再帰的なメモ化（DP）を導入して、各nから1への手数を計算する
		// 既に計算済みの値があればそれを使う
		
		// 状態: nから1への手数を求める
		
		// 実行時に再帰的なメモ化を適用する
		
		// 簡略化のため、各クエリに対して個別に計算し、メモ化を適用する
		
		// 実際の計算ロジックを再構築
		
		// 処理を再実行し、メモ化を正しく適用する
		
		// 外部ループで処理を続けるため、ここでは再帰的なヘルパー関数を定義し、グローバルなメモ化を管理する
		
		// 外部ループの処理を再構成
		
		// 処理を再実行する
		
		// ------------------------------------------------------------------
		// 再度、処理を記述する。外部ループ内でメモ化を管理する。
		// ------------------------------------------------------------------
	}

	// 最終的な合計を出力
	fmt.Printf("total=%d\n", total)
}

// 修正後の実装（上記コードブロックの意図を反映させるため、メイン関数全体を再構成します）
// 外部ループでの処理が不完全だったため、再帰的なメモ化を組み込んだ形で全体を書き直します。
// 課題の要求は「すべてのクエリの手数の合計」なので、各クエリに対して計算し、合計する。

/*
再実装案：
各クエリ n に対して、nから1への手数を再帰的に計算し、メモ化する。
*/

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化テーブル: nから1への手数を格納
	memo := make(map[int64]int64)

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

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// nから1への手数を計算する関数（再帰的メモ化）
		var calculateSteps func(k int64) int64
		calculateSteps = func(k int64) int64 {
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

	fmt.Printf("total=%d\n", total)
}
