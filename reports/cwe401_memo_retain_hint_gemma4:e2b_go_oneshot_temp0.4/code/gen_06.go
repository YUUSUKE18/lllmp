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
			if _, ok := memo[current]; ok {
				// メモがあればスキップ
				count += memo[current]
				current = 1 // 終了
				break
			}

			// 3n+1 または n/2 の操作
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}

		// 1に到達したときのステップ数をメモに追加
		if current == 1 {
			memo[n] = count
		}

		// 合計に加算
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
