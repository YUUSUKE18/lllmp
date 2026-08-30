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
			// nが1のときの手数は0
			total += 0
			continue
		}

		// メモ化された値があればそれを使用
		if result, ok := memo[n]; ok {
			total += result
			continue
		}

		// 計算処理
		var steps int64 = 0
		current := int64(n)

		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}

		// 結果を合計に加算し、メモ化
		total += steps
		memo[n] = steps
	}

	fmt.Printf("total=%d\n", total)
}
