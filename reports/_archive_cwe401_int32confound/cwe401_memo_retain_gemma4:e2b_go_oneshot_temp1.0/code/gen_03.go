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
			continue // 整数として解釈できない行は無視
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var count int64 = 0
		current := n

		for current != 1 {
			if val, found := memo[current]; found {
				count += val
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
			memo[n] = count // 最初のnから到達したときのステップ数をメモする（ただし、再帰的に計算するのではなく、ここでは個々のnに対して計算する）
		}

		// 再度、メモ化をより効率的に行うための修正（各nに対する計算結果をメモする）
		// この問題は、各クエリnについて1に到達するまでのステップ数を求め、その合計を求めよ、という問題です。
		// したがって、入力された各nに対して、実際に計算する際にメモ化を用いる必要があります。

		// nに対して1に到達するまでのステップ数を計算し、合計に加算する
		steps := int64(0)
		currentN := n
		if currentN == 1 {
			steps = 0
		} else {
			for currentN != 1 {
				if s, found := memo[currentN]; found {
					steps = s
					break
				}
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
			}
			// 1に到達したときのステップ数をnのメモに保存
			memo[n] = steps
		}

		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
