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

		var calculate func(n int64) int64
		calculate = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// n が偶数なら n/2
				result = calculate(n / 2) + 1
			} else {
				// n が奇数なら 3n+1
				result = calculate(3*n + 1) + 1
			}

			memo[n] = result
			return result
		}

		// 計算実行
		// 最初にmemoをクリアして、各クエリで独立した計算を行う必要があるが、
		// 仕様「計算結果をメモ化して高速化してください」は、全体を通してのメモ化を意味すると解釈し、
		// 1回の実行で、入力された全ての数に対する結果を計算する方針をとる。
		// ただし、再帰的なメモ化は、呼び出しスタック全体で共有されるため、
		// 外部ループで毎回初期化されるべきではない。
		// ここでは、全体の処理を効率化するため、メインループの外で、
		// 既に計算済みの結果を再利用する構造にする。

		// 課題の意図を再解釈し、各クエリ n について、1 に到達するまでの手数を求め、その合計を求める。
		// 敵対的に大きな入力に対応するため、再帰的なメモ化（動的計画法）を適用する。

		// 外部ループで、入力された各 n に対して計算を行う。
		// メモ化は、全ての n について共有されるべき。

		// 関数を再定義し、外部から呼び出される形にするため、メインループ内で直接呼び出す。
		// 呼び出しごとにmemoをリセットすると高速化の恩恵が薄れるため、
		// 外部でmemoを管理する。

		// 外部でmemoを定義し、再帰関数がそれを参照するようにする。

		// 外部でmemoを定義
		memoForQuery := make(map[int64]int64)

		var calculateMemoized func(n int64) int64
		calculateMemoized = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memoForQuery[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				result = calculateMemoized(n / 2) + 1
			} else {
				result = calculateMemoized(3*n + 1) + 1
			}

			memoForQuery[n] = result
			return result
		}

		// 各クエリ n について計算
		if n >= 1 {
			// 念のため、もしnが非常に大きい場合、計算が深くなりすぎる可能性があるが、
			// 3n+1の操作は対数時間で収束するため、これは実用的に問題ないはず。
			// 64bit整数で十分収まる。
			
			// nに対する計算結果を取得
			result := calculateMemoized(n)
			total += result
		}
	}

	fmt.Printf("total=%d\n", total)
}
