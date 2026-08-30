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

		var n int
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		var count int64 = 0
		current := n

		for current != 1 {
			if count > 1000000 { // 安全策：無限ループを防ぐための制限（理論上は不要だが、念のため）
				break
			}
			if current == 1 {
				break
			}

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}

		// 結果をメモ化
		memo[n] = count
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
