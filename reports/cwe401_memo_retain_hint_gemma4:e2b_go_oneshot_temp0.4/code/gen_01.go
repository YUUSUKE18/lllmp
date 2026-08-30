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

		// 1に到達するまでの手数を計算
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
			memo[n] = count // nから開始したときの計算過程をメモするのではなく、現在の値までのステップ数を記録する
		}

		// 1に到達するまでの手数を再計算し、メモ化をより適切に行うための修正
		// 実際には、各クエリ n について、n から 1 に到達するまでのステップ数を計算し、その合計を求める必要がある。
		// ここでは、各クエリ n ごとに計算し、その結果を合計する。
		// メモ化は、同じ値が再登場した場合に役立つ。

		// 再度、各クエリ n について計算し、合計を求める
		// 実際には、各クエリ n に対して、n から 1 へのパスの長さを計算する。
		// 質問の意図は、各クエリ n について、操作を繰り返して 1 に到達するまでの「手数」を求め、その合計を求めること。

		// ここでは、各クエリ n について、n から 1 へのパスの長さを計算する。
		// 質問の記述を再解釈: "各クエリ n について、n が偶数なら n/2、奇数なら 3n+1 に置き換える操作を繰り返し、1 に到達するまでの手数を求めます。"
		// これは、Collatz数列のステップ数を求める問題と解釈する。

		// メモ化を適用して、各クエリ n の計算を高速化する。
		// 実際には、各クエリ n に対して、n から 1 へのパスの長さを計算し、その合計を求める。

		// 再計算（メモ化を適用）
		current = n
		steps := int64(0)
		path := []int64{n}
		visited := make(map[int64]int64) // 値とそのステップ数を記録

		for current != 1 {
			if current == 1 {
				break
			}
			if val, ok := visited[current]; ok {
				// 既に計算済みの値に到達した場合、そのステップ数を加算して終了
				steps += (int64(len(path)) - int64(len(visited)))
				break
			}

			// 探索の深さ制限（実用的な時間とメモリのため）
			if steps > 100000 { // 非常に大きな値になるのを防ぐための安全策
				// 探索が深すぎる場合は、メモ化に頼るか、無限ループの可能性を考慮する
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
			path = append(path, current)
			visited[current] = steps
		}

		// 1に到達するまでの手数を計算し、合計に加算する
		// 最終的な手数は、nから1へのパスの長さ。
		// 質問の要求は「nが1に到達するまでの手数」なので、nから開始したときのステップ数を求める。

		// 再度、クエリ n ごとに、n から 1 へのステップ数を計算する。
		// メモ化は、異なるクエリ n が同じ中間値に到達した場合に役立つ。

		// 各クエリ n について、n から 1 へのステップ数を計算する。
		current = n
		steps = 0
		// 経路を記録して、ループ検出とメモ化を同時に行う
		path = []int64{n}
		visited = make(map[int64]int64)
		visited[n] = 0

		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++

			if current == 1 {
				// 1に到達した
				total += int64(steps)
				break
			}

			// メモ化の適用
			if val, ok := visited[current]; ok {
				// 既に計算済みの値に到達した場合、その差分を加算して終了
				total += (int64(steps) - val)
				break
			}

			visited[current] = steps
			path = append(path, current)
		}
	}

	fmt.Printf("total=%d\n", total)
}
