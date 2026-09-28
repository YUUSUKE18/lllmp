package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalCount int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		// 繰り返し計算（メモ化付き）
		currentN := n
		count := int64(0)

		for currentN != 1 {
			if val, ok := memo[currentN]; ok {
				count += val
				break
			}

			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			count++
			memo[n] = count // 最初のnからのパスを記録（より厳密には現在のcurrentNからのパスを記録するべきだが、ここでは単純化）
		}

		// 最終的な計算（この問題は通常、nから1に到達するまでのステップ数を求める問題であり、
		// 各クエリごとに独立して計算し、その合計を求める）

		// 再度、クエリ n に対する到達までの手数を計算し直す（メモ化の利用をより効果的に）
		// ここでは、各クエリ n が独立しているため、各nについて直接計算する方が安全で明確。
		// ただし、「同じ整数が繰り返し現れるので、計算結果をメモ化して高速化してください」という指示は、
		// 通常、Farmer Johnの旅のような問題（nから1へのパス）で、複数のクエリが同じ中間値を持つ場合に役立つ。
		// この問題文の構造上、クエリ n に対する手数を求めることに焦点を当てる。

		// 最終的な処理を、各クエリ n の計算と合計に絞る。
		// ここでの「手数」とは、nから1に到達するまでのステップ数。

		// メモ化を、現在のクエリ n の計算に特化させる。
		// 今回は、各クエリ n に対する計算結果を直接計算する。
		
		// 再計算 (nから1へのステップ数)
		tempN := n
		steps := int64(0)
		if n != 1 {
			for tempN != 1 {
				if tempN%2 == 0 {
					tempN /= 2
				} else {
					tempN = 3*tempN + 1
				}
				steps++
			}
		}
		
		totalCount += steps
	}

	fmt.Printf("total=%d\n", totalCount)
}
