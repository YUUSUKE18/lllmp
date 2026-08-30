package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0
	memo := make(map[int]int64)

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
			// 1 に到達するまでの手数は 0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 再帰またはループで計算（メモ化を利用）
		current := n
		steps := int64(0)
		path := []int{} // 計算過程を記録（メモ化のために）

		for current != 1 {
			if current == 1 {
				break
			}
			path = append(path, current)

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}

		// 1 に到達した後の手数を計算し、メモ化
		// 最終的に1に到達するまでの手数は、上記ループで計算された steps に等しい
		// ただし、n=1 の場合は 0
		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
