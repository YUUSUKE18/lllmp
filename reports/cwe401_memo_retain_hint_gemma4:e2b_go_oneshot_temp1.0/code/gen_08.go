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
			memo[n] = count // 最初のnに対する計算過程を記録するのではなく、現在のnに対する遷移を記録する方が効率的だが、ここでは一般的なMemoizationとしてnをキーに遷移数を記録する
		}

		// 実際には、各クエリnに対してnが1になるまでのステップ数を求める必要がある。
		// 再帰的または動的計画法で各nのステップ数を計算し、その合計を求める。
		// 課題の要求：「すべてのクエリの手数の合計を求めます。」
		// これは、入力された各数nについて、nから1に到達するまでの操作回数を計算し、その合計を求めることを意味する。

		// 再度、各入力nについてnから1へのパスを計算する
		// 今回の制約では、各入力nに対して独立に計算し、その結果を合計する。
		// メモ化は、同じ中間値に到達した場合の計算結果を再利用するために行う。
		// ただし、この問題は「カントリングの過程」であり、通常、この過程の長さ自体が問われる。
		// ここでは、入力された各nについて、nが1になるまでの操作回数を計算し、その合計を求める。

		// 実際の実装では、各nについて個別に計算する（メモ化が最も効果的）。

		// 各入力nについて、nから1に到達するまでの手数を計算
		n_val := n
		steps := 0
		if n_val == 1 {
			steps = 0
		} else {
			// 計算過程をメモ化する辞書
			memo_path := make(map[int64]int64)
			memo_path[1] = 0

			for steps == 0 {
				if steps > 0 {
					// 奇数なら 3n+1, 偶数なら n/2
					if n_val%2 == 0 {
						n_val /= 2
					} else {
						n_val = 3*n_val + 1
					}
					steps++

					if n_val == 1 {
						break
					}

					// メモ化の更新
					if _, ok := memo_path[n_val]; !ok {
						memo_path[n_val] = steps
					}
				}
			}
			steps = memo_path[n]
		}
		
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
