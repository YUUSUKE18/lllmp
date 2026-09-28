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
		// 空行や整数として解釈できない行を無視
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 関数定義（再帰＋メモ化）
		var solve func(n int) int64
		solve = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// nが偶数なら n/2
				result = solve(n / 2)
			} else {
				// nが奇数なら 3n+1
				result = solve(3*n + 1)
			}

			// メモ化
			memo[n] = result
			return result
		}

		// 計算実行
		// 注意: 実際には、クエリごとにメモ化を共有する必要がありますが、
		// 問題の仕様は「クエリ n について... 手数を求めます」であり、
		// 各クエリが独立していると解釈し、各クエリで計算します。
		// ただし、全体で同じ数値を扱うため、グローバルまたはスコープ外でメモ化を共有するのが一般的です。
		// ここでは、各クエリで独立したメモ化を使用せず、呼び出しごとに計算されるようにします。
		// しかし、仕様では「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」とあるため、
		// 全てのクエリを対象とする一つのメモ化構造を維持する必要があります。

		// 実行する際は、各クエリが独立した計算であることを確認しつつ、
		// メモ化が効果を発揮するように設計します。
		// 外部で初期化されたメモ化構造を再利用する必要があります。

		// 外部でメモ化を管理する構造に変更
		// (再実行のため、このブロック全体を構造体や外部関数内で処理します)
	}

	// --- 再設計：メモ化を保持するための再実行 ---

	// すべての入力データを一度読み込んでから処理する方が、メモ化が機能しやすいため、
	// 標準入力全体を読み込みます。

	// 再度処理
	scanner2 := bufio.NewScanner(os.Stdin)
	allQueries := []int{}

	for scanner2.Scan() {
		line := scanner2.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		allQueries = append(allQueries, n)
	}

	// メモ化構造
	memoFinal := make(map[int]int64)

	var solveFinal func(n int) int64
	solveFinal = func(n int) int64 {
		if n == 1 {
			return 0
		}
		if val, ok := memoFinal[n]; ok {
			return val
		}

		var result int64
		if n%2 == 0 {
			// nが偶数なら n/2
			result = solveFinal(n / 2)
		} else {
			// nが奇数なら 3n+1
			result = solveFinal(3*n + 1)
		}

		memoFinal[n] = result
		return result
	}

	// 全クエリの処理と合計の計算
	for _, n := range allQueries {
		if n < 1 {
			continue // 1以上の整数のみを対象
		}
		// 各クエリに対する手数を計算（メモ化を使用）
		result := solveFinal(n)
		total += result
	}

	// 結果の出力
	fmt.Printf("total=%d\n", total)
}
