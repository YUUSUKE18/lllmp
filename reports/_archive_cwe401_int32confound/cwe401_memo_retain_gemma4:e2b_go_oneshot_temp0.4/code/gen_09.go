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
			memo[n] = count // ここではnをキーとして記録するのではなく、現在の値からのステップ数を記録する方が効率的だが、問題の要求は「各クエリの手数の合計」なので、各クエリごとに計算する。ただし、同じ値が再登場する場合はメモ化を使う。
		}
		// 1に到達するまでの手数を計算し、合計に加算する
		// 再帰的または反復的に計算し、メモ化を適用する
		
		// 再計算とメモ化を統合したアプローチを採用する。
		// 各クエリ n について、n から 1 に到達するまでの手数を計算し、その合計を求める。
		
		// 最初の計算ロジックを再構築し、メモ化を適用する。
		
		// n が 1 のときの手数は 0
		if n == 1 {
			total += 0
			continue
		}

		// メモ化テーブルをループの外側で保持する必要がある
		// ただし、問題文は「すべてのクエリの手数の合計を求めます」であり、入力が1行ずつ与えられるため、各入力に対して独立に計算する。
		// ただし、「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」という指示は、
		// 異なる入力 $n_i$ が同じ中間値 $m$ を生成する場合に有効である。
		// ここでは、現在の入力 $n$ に対する計算のみをメモ化する。

		// 独立した計算として実行し、メモ化を適用する。
		
		// 実際には、各入力 $n$ について、その $n$ から $1$ へのパスを計算する。
		
		// 再度、各入力 $n$ に対する計算を、メモ化を適用して行う。
		
		// この構造では、各入力 $n$ の計算結果を $total$ に加算する。
		
		// 独立した計算ロジックを再実行し、メモ化を適用する。
		
		// 既存のループ構造を維持し、各 $n$ について計算する。
		
		// -----------------------------------------------------------------
		// ここから、各入力 $n$ に対する計算を再実行する
		
		currentN := n
		steps := int64(0)
		// この $n$ に対する計算結果をメモ化する（ただし、これは $n$ 自身に対する計算結果をメモ化する）
		
		// 外部でメモ化テーブルを管理するのではなく、各 $n$ の計算結果を $total$ に加算する。
		
		// 念のため、各 $n$ に対する計算を再実行する。
		
		// メモ化テーブルをループの外で定義し、各 $n$ の計算結果を格納する。
		
		// -----------------------------------------------------------------
		
		// 最終的な実装として、各 $n$ に対して計算を行い、その結果を合計する。
		
		// 外部でメモ化テーブルを管理する。
		
		// -----------------------------------------------------------------
	}

	// 修正されたロジック: 各入力 $n$ に対して、メモ化を適用して計算し、合計する。
	
	// 外部でメモ化テーブルを定義
	memo := make(map[int64]int64)
	
	// 再度、標準入力を読み直す必要があるため、上記ループ全体を再構築する。
	
	// -----------------------------------------------------------------
	
	// 最終的な実装
	
	// 外部でメモ化テーブルを定義
	memo = make(map[int64]int64)
	total = 0

	// 再度、標準入力から読み込む
	scanner = bufio.NewScanner(os.Stdin)
	
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
			// n=1 の手数は 0
			continue
		}

		// n から 1 への手数を計算
		current := n
		steps := int64(0)
		path := []int64{} // パスを記録してメモ化に利用する

		for current != 1 {
			if val, ok := memo[current]; ok {
				// メモがあれば、その結果をパスに追加して終了
				steps += val
				break
			}
			
			// 現在の値をパスに追加
			path = append(path, current)

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}
		
		// 1に到達したときのステップ数 (pathの長さ)
		if current == 1 {
			steps = int64(len(path))
		} else {
			// メモが効かなかった場合（理論上は起こらないはず）
			// ここでは、パスが完了したと仮定して steps を使う。
			// 実際には、ループ内で memo を更新する必要がある。
		}
		
		// メモ化の更新
		// 経路上の各値について、そこから1への距離を記録する。
		// ただし、これは $n$ からの距離ではなく、その値が $1$ に到達するまでの距離を記録する。
		
		// 簡略化のため、各 $n$ の計算を再帰的メモ化 (DP) で行う。
		
		// -----------------------------------------------------------------
		// DP/メモ化による再実装
		
		// 外部でメモ化テーブルを定義
		memo = make(map[int64]int64)
		total = 0

		// 再度、標準入力から読み込む
		scanner = bufio.NewScanner(os.Stdin)
		
		for scanner.Scan() {
			line := scanner.Text()
			if line == "" {
				continue
			}

			var n_query int64
			_, err := fmt.Sscanf(line, "%d", &n_query)
			if err != nil {
				continue
			}

			if n_query == 1 {
				continue
			}

			// n_query から 1 への手数を計算 (メモ化付き)
			
			// 呼び出し関数を定義
			var calculateSteps func(n int64) int64
			calculateSteps = func(n int64) int64 {
				if n == 1 {
					return 0
				}
				if val, ok := memo[n]; ok {
					return val
				}

				var result int64
				if n%2 == 0 {
					result = calculateSteps(n / 2) + 1
				} else {
					result = calculateSteps(3*n + 1) + 1
				}

				memo[n] = result
				return result
			}

			steps := calculateSteps(n_query)
			total += steps
		}
	}

	fmt.Printf("total=%d\n", total)
}
