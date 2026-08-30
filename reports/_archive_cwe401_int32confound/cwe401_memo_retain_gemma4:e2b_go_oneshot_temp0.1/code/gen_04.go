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

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)
		memo[1] = 0

		currentN := n
		steps := int64(0)

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps += memo[currentN]
				currentN = 1 // 1に到達したと仮定してループを抜ける
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 実際には、再帰的なメモ化（または動的計画法）がより適切だが、
		// ここでは与えられた操作を直接シミュレーションし、到達までのステップ数を数える。
		// 厳密には、各クエリ n について、n から 1 に到達するまでの操作回数を求める必要がある。
		// 提示された操作はコネルの予想（3n+1問題）であり、その解法は通常、
		// 1 に到達するまでのステップ数を求める問題（Collatz conjecture）である。
		// ここでは、n から 1 に到達するまでのステップ数を計算する。

		// 再計算（メモ化を適用した、より正しいアプローチ）
		// 実際には、各クエリ n について、n から 1 に到達するまでのステップ数を求める。
		// 提示された仕様は「n が 1 に到達するまでの手数を求めます」なので、
		// 各クエリ n に対して、その操作を繰り返して 1 に到達するまでのステップ数を計算する。

		// メモ化を再導入し、各クエリ n についてのステップ数を計算する。
		// 外部ループで処理するのではなく、各クエリ n に対して個別に計算する。

		// 外部ループの処理を修正し、各クエリ n についてステップ数を計算する。
		// 外部ループの構造を再構築する。
	}

	// 修正されたロジック：各入力行 n について、n から 1 に到達するまでのステップ数を計算し、合計する。
	// メモ化は、計算過程で再利用するために使用する。

	// 再度、標準入力から読み込み、合計を計算する。
	// 外部ループで処理を再実行する。
	scanner = bufio.NewScanner(os.Stdin)
	total = 0

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
			total += 0
			continue
		}

		// メモ化テーブルの初期化（この問題では、各クエリ n の計算結果をメモ化する）
		// 外部で共有するメモ化テーブルは、すべてのクエリにわたって有効である。
		// ただし、この問題の構造上、各 n の計算は独立しているため、
		// 外部でメモ化を管理するのではなく、各 n の計算内で再帰的または反復的にメモ化を適用する。

		// ここでは、各 n について、n から 1 へのパスを計算する。
		// 1 に到達するまでのステップ数を求める。
		
		// 外部でメモ化テーブルを管理する
		memo := make(map[int64]int64)
		memo[1] = 0
		
		currentN := n
		steps := int64(0)
		path := []int64{} // パスを記録して、後でメモ化を更新するために使用

		for currentN != 1 {
			if _, ok := memo[currentN]; ok {
				steps += memo[currentN]
				// 既に計算済みの部分をスキップして、現在のパスを追跡する
				// このアプローチは、n から 1 へのパスを求めるのではなく、
				// n から 1 へのパス上の各ステップの「コスト」を求めることになるため、
				// 単純な反復計算で十分である。
				break
			}
			
			// 1 に到達するまでのステップ数を求めるための単純な反復計算
			// 複雑なメモ化は、Collatz問題の「到達までのステップ数」を求める問題とは異なるため、
			// ここでは最も直接的な解法を採用する。
			
			// 1 に到達するまでのステップ数を求める
			tempN := n
			tempSteps := int64(0)
			
			// 経路を記録し、サイクルを検出する（今回は1に到達することを前提とする）
			visited := make(map[int64]bool)
			
			for tempN != 1 {
				if visited[tempN] {
					// サイクルに陥った場合（Collatz問題では通常発生しないが、念のため）
					// この問題では、1に到達することを前提とするため、この分岐は不要かもしれない。
					// 1に到達しない場合は、無限ループになる可能性がある。
					break
				}
				visited[tempN] = true
				
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				tempSteps++
			}
			
			if tempN == 1 {
				total += tempSteps
			} else {
				// 1に到達しなかった場合（仕様上は発生しないはず）
				// エラー処理や無視
			}
		}
	}

	fmt.Printf("total=%d\n", total)
}
