package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	// メモ化テーブル
	memo := make(map[int]int64)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		// 空白区切りで整数を読み込む
		fields := strings.Fields(line)
		for _, field := range fields {
			n, err := strconv.Atoi(field)
			if err != nil {
				continue
			}

			if n == 1 {
				// nが1のときの手数は0
				memo[1] = 0
			} else if _, ok := memo[n]; !ok {
				// 再帰/メモ化再帰で計算
				var count int64
				if n%2 == 0 {
					// n が偶数なら n/2
					count = memo[n/2] + 1
				} else {
					// n が奇数なら 3n+1
					count = memo[3*n+1] + 1
				}
				memo[n] = count
			}
		}
	}

	// すべてのクエリの結果を合計する
	// 注意: 上記のロジックでは、入力された各数に対して計算した結果を合計する必要があります。
	// 課題の指示「すべてのクエリの手数の合計を求めます」に基づき、入力された各数 n について、
	// 1 に到達するまでの手数を計算し、その合計を求める必要があります。
	// しかし、与えられた例の処理方法（入力された数に対する操作の回数を求める）を再解釈します。
	// 通常、この種の問題は入力された各数 n に対して、操作を繰り返して 1 に到達するまでのステップ数を求めることを意味します。

	// 再度、入力処理を、各数 n について 1 に到達するまでのステップ数を計算するように修正します。
	// この問題は、Collatz数列のステップ数を求める問題と解釈します。

	// --- 再度、入力処理と計算ロジックを修正 ---

	// メモ化テーブルをリセットし、再計算
	memo = make(map[int]int64)
	var finalTotal int64 = 0

	// 標準入力全体を再走査（ここでは入力が1行ずつ与えられると仮定し、各行を個別のクエリとみなす）
	// ただし、元のコード例の構造に従い、入力された全ての整数を処理します。
	// 課題の「各クエリ n について...」を、入力された全ての整数 n について計算することと解釈します。

	// 入力ストリームを再構築し、全ての整数を処理
	inputData := []string{}
	scanner = bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		inputData = append(inputData, scanner.Text())
	}

	for _, line := range inputData {
		fields := strings.Fields(line)
		for _, field := range fields {
			n, err := strconv.Atoi(field)
			if err != nil {
				continue
			}

			if n == 1 {
				// nが1のときの手数は0
				memo[1] = 0
			} else if _, ok := memo[n]; !ok {
				// Collatz数列のステップ数を計算
				current := int64(n)
				steps := int64(0)
				path := []int64{} // サイクル検出とメモ化のための一時的なパス
				
				for current != 1 && (current != 0 && current != -1) {
					if _, ok := memo[int(current)]; ok {
						// 既にメモがあれば、そこから加算
						steps += memo[int(current)]
						break
					}
					
					// サイクル検出のためのパス追跡（メモ化が完了するまで待つ）
					path = append(path, current)
					if current%2 == 0 {
						current /= 2
					} else {
						current = 3*current + 1
					}
					steps++
				}
				
				// サイクル検出後の処理（ここでは単純なメモ化のみを優先し、再帰的なメモ化を採用）
				// 再帰的なメモ化が最もシンプルで指示に適合しやすい。

				// 再帰的なメモ化を再適用
				var calculateSteps func(n int) int64
				calculateSteps = func(n int) int64 {
					if n == 1 {
						return 0
					}
					if _, ok := memo[n]; ok {
						return memo[n]
					}

					// サイクル検出用の補助（無限ループ防止）
					// 実際には、Collatz数列では常に1に収束すると仮定します。
					
					var result int64
					if n%2 == 0 {
						result = calculateSteps(n / 2) + 1
					} else {
						result = calculateSteps(3*n+1) + 1
					}
					memo[n] = result
					return result
				}
				
				result = calculateSteps(n)
				
				// 全てのクエリの手数を合計
				finalTotal += result
			}
		}
	}

	fmt.Printf("total=%d\n", finalTotal)
}
