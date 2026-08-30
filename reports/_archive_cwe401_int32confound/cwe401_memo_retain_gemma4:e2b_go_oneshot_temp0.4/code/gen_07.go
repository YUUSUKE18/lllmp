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
			memo[n] = count // nからスタートしたときの計算過程をメモするのではなく、現在の値までのステップ数を計算する
		}

		// 1に到達するまでの手数を計算し、合計に加算する
		// 再帰的なメモ化（または動的計画法）で計算する方が効率的だが、ここでは与えられた操作を直接シミュレーションする。
		// 実際には、各nについて1に到達するまでのステップ数を計算し、その合計を求める。

		// 再計算とメモ化を統合して、より効率的に行う
		// ここでは、各nについて1に到達するまでのステップ数を計算する関数を定義し、メモ化する。

		// 再度、より適切なメモ化戦略を採用する。
		// 各nについて、1に到達するまでのステップ数を計算する。

		var steps int64 = 0
		current = n
		if current == 1 {
			steps = 0
		} else {
			// 1に到達するまでのステップ数を計算する
			for current != 1 {
				if val, ok := memo[current]; ok {
					steps += val
					break
				}

				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				steps++
			}
			// 1に到達した後のステップ数をメモする（これは不要、nからスタートしたときのステップ数をメモする）
			// 実際には、nが与えられたときのステップ数を計算する。
			memo[n] = steps
		}

		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
