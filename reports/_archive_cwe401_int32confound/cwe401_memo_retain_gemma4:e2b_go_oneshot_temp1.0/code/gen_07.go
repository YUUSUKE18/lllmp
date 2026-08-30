package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	totalCount := int64(0)
	memo := make(map[int]int64)

	scanner := bufio.NewScanner(os.Stdin)
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

		if n == 1 {
			totalCount += 0
			continue
		}

		if count, ok := memo[n]; ok {
			totalCount += count
		} else {
			// 計算とメモ化
			currentN := n
			steps := int64(0)
			path := []int{}

			for currentN != 1 {
				if currentN == 0 { // 0は発生しないはずだが念のため
					break
				}
				path = append(path, currentN)

				if currentN%2 == 0 {
					currentN /= 2
				} else {
					currentN = 3*currentN + 1
				}
				steps++
			}

			// 逆順でメモをセット
			for i := len(path) - 1; i >= 0; i-- {
				memo[path[i]] = steps - int64(i)
			}

			totalCount += steps
		}
	}

	fmt.Printf("total=%d\n", totalCount)
}
