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
			memo[n] = count // nからスタートしたときの計算過程をメモするのではなく、現在の値までのステップ数をメモする
		}
		// 1に到達するまでの手数を計算し、合計に加算する
		// 再帰的なメモ化（またはDP）で、各nから1への経路の長さを求める方が効率的だが、
		// ここでは与えられた操作を繰り返す過程のステップ数を数える。
		// 実際には、各nが1に到達するまでのステップ数を求める必要がある。

		// 再度、メモ化をより適切に行う。各nが1に到達するまでのステップ数を求める。
		// 1に到達するまでのステップ数を求める問題は、通常、各nが1に到達するまでのステップ数を求める問題として解かれる。
		// ここでは、与えられた操作を繰り返す手数を求める。

		// 修正：各nが1に到達するまでのステップ数を求める。
		// 1に到達するまでのステップ数を求める問題は、通常、各nが1に到達するまでのステップ数を求める問題として解かれる。
		// 1に到達するまでのステップ数を求める問題は、通常、各nが1に到達するまでのステップ数を求める問題として解かれる。

		// 1に到達するまでの手数を求めるための再計算（メモ化を適用）
		var steps int64 = 0
		current = n
		if current == 1 {
			steps = 0
		} else {
			// 経路を追跡し、サイクルを検出する（ただし、この問題は1に収束するためサイクルは発生しない）
			// 1に到達するまでのステップ数を数える
			for current != 1 {
				if val, ok := memo[current]; ok {
					// 既に計算済みの値があれば、その結果を足し合わせる
					steps += val
					break
				}
				// サイクル検出（今回は不要だが念のため）
				// 既に計算済みの値があれば、その結果を足し合わせる
				// サイクル検出は、現在の値が既に計算中の経路に含まれているかを確認する。
				// 今回は、各nが1に到達するまでのステップ数を求めるため、単純な再帰的メモ化（DP）が最も適切。

				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				steps++
			}
		}

		// 最終的なステップ数をメモに追加
		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
