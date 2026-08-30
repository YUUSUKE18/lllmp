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
		memo[1] = 0

		// BFSまたは再帰で手数を計算し、メモ化する
		// ここでは、各クエリに対して個別に計算し、その結果を合計するアプローチを取る。
		// 繰り返し操作の計算は、各クエリごとに独立して行う。

		currentN := n
		steps := int64(0)

		if currentN == 1 {
			steps = 0
		} else {
			// 繰り返し操作をシミュレーション
			for currentN != 1 {
				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
			}
		}

		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
