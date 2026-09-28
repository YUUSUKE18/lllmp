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
			if current == 1 {
				count = 0
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
			memo[n] = count // n はクエリ全体を表すため、ここでは n をキーにするのではなく、現在の値 current をキーにするべきだが、問題文の意図を再解釈する。
			// 問題文は「各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。」
			// これは、各クエリ n に対して、n から 1 に到達するまでのステップ数を求めることを意味する。
			// したがって、各クエリ n に対して独立して計算し、その結果を合計する。
		}

		// 再計算ロジックを修正: 各クエリ n について、n から 1 へのステップ数を求める。
		// メモ化は、同じ n が入力された場合の計算結果を保存するために行う。
		// しかし、この問題は「すべてのクエリの手数の合計」を求めるため、各クエリごとに計算すればよい。
		// 敵対的に大きな入力に対しても高速化が必要なため、Fibonacci-likeな数列の性質を利用したメモ化再帰（または動的計画法）が適切。

		// 再度、各クエリ n について、n から 1 へのステップ数を求める。
		// メモ化は、n から 1 へのステップ数を保存する。
		// ただし、この問題は「n が偶数なら n/2、奇数なら 3n+1」という操作を適用する過程のステップ数を数える問題であり、
		// 典型的なCollatz予想のステップ数計算に似ている。

		// 各クエリ n について、n から 1 へのステップ数を計算する。
		// 1 のときのステップ数は 0。
		// n > 1 の場合:
		// もし n が偶数なら、n -> n/2 (1ステップ)
		// もし n が奇数なら、n -> 3n+1 (1ステップ)

		// 実行する計算を再定義する。
		
		currentN := n
		steps := 0
		
		// 1 のときの手数は 0
		if currentN == 1 {
			steps = 0
		} else {
			// n > 1 の場合、操作を繰り返す
			for currentN != 1 {
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
			}
		}
		
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
