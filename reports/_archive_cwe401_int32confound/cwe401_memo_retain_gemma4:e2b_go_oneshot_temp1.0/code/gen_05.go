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
		if err != nil || n < 1 {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

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
		}
		// 1に到達するまでのステップ数を計算し、メモ化する
		memo[n] = int64(count)
		total += int64(count)
	}

	fmt.Printf("total=%d\n", total)
}
