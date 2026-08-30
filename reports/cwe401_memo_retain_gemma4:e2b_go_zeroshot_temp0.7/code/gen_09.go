package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// 標準入力から読み込む
	scanner := bufio.NewScanner(os.Stdin)
	var totalCount int64 = 0

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

		// メモ化用のマップ
		memo := make(map[int]int64)

		// nが1の場合は手数は0
		if n == 1 {
			memo[1] = 0
		} else {
			// 再帰的または反復的に計算し、メモ化する
			// ここでは再帰的なメモ化（トップダウン）を想定して、関数として実装する。
			// ただし、メインループ内で完結させるため、ここでは直接計算とメモ化を組み合わせる。

			// 効率的な計算のために、再帰的な構造を模倣し、メモ化を利用する関数を定義する。
			// この問題は、Collatz予想に関連しており、計算過程で値が大きくなる可能性があるため、
			// 64bit整数を使用する。
			
			var count func(n int) int64
			count = func(n int) int64 {
				if n == 1 {
					return 0
				}
				if val, ok := memo[n]; ok {
					return val
				}

				var result int64
				if n%2 == 0 {
					// n が偶数なら n/2
					result = count(n / 2)
				} else {
					// n が奇数なら 3n+1
					result = count(3*n + 1)
				}

				// メモ化
				memo[n] = result
				return result
			}

			// クエリ n について計算を実行
			totalCount += count(n)
		}
	}

	// 結果を出力
	fmt.Printf("total=%d\n", totalCount)
}
