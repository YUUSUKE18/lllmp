package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var total int64 = 0
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

		// メモ化された結果を保持するマップ
		memo := make(map[int]int64)

		var count int64 = 0
		currentN := n

		// n が 1 に到達するまでの操作を繰り返す
		for currentN != 1 {
			// メモ化された値があるかチェック
			if val, ok := memo[currentN]; ok {
				count += val
				break
			}

			// 操作の適用
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}

			// 再帰的な呼び出しの代わりに、現在のパスでの手数を計算し、
			// 既に計算済みの値があればそれを加算する（メモ化の利用）

			// この問題は、各クエリ n から 1 に到達するまでのステップ数を求める問題であり、
			// 繰り返し操作の経路を追う問題です。
			// 厳密には、各 n に対するステップ数を求める必要があります。
			// ここでは、各 n についてのステップ数を再帰的または反復的に計算し、メモ化します。
		}

		// 修正：各 n についてのステップ数を計算し、合計する。
		// 繰り返し操作の過程で、各ステップ数を記録し、メモ化を適用する。

		// 再計算：各 n から 1 への経路を追跡し、ステップ数を数える。
		// 最初に n から 1 への経路を追跡する関数を定義し、それをメモ化する。

		// 既存のメモ化戦略を再構築する。
		// memo は、特定の数から 1 への手数を格納する。

		// 処理を再実行し、メモ化を正しく適用する。
		// 外部ループの前に、すべてのクエリに対して計算を行う必要がある。

		// 外部ループを削除し、入力された各 n について計算する。
		// 最初のループは、入力された n についての計算を行う。
		// 外部のループを削除し、各入力 n について計算を行う。
		// 最初のループで計算した結果を合計する。

		// -----------------------------------------------------------------
		// 再度、入力された n について計算を行う。
		// -----------------------------------------------------------------
		// 外部ループを削除し、入力された各 n について計算する。
		// 最初のループで計算した結果を合計する。

		// -----------------------------------------------------------------
		// 最終的な実装方針：
		// 各入力 n について、n から 1 への手数を計算し、合計する。
		// 過程でメモ化を利用する。
	}

	// -----------------------------------------------------------------
	// 正しい実装のための再構成
	// -----------------------------------------------------------------

	// メモ化テーブルを初期化
	memoFinal := make(map[int]int64)
	totalFinal := int64(0)

	// 再度、標準入力から読み込み、計算を実行する
	scanner2 := bufio.NewScanner(os.Stdin)
	for scanner2.Scan() {
		line := scanner2.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// n から 1 への手数を計算する関数 (再帰 + メモ化)
		var calculateSteps func(k int) int64
		calculateSteps = func(k int) int64 {
			if k == 1 {
				return 0
			}
			if val, ok := memoFinal[k]; ok {
				return val
			}

			var steps int64
			if k%2 == 0 {
				// n が偶数なら n/2
				steps = 1 + calculateSteps(k/2)
			} else {
				// n が奇数なら 3n+1
				steps = 1 + calculateSteps(3*k+1)
			}

			memoFinal[k] = steps
			return steps
		}

		steps := calculateSteps(n)
		totalFinal += steps
	}

	// 結果の出力
	fmt.Printf("total=%d\n", totalFinal)
}
