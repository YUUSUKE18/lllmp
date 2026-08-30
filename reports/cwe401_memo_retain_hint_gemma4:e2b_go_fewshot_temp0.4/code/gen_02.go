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

		// 再帰または反復計算で手数を求める
		var steps int64 = 0
		currentN := n
		
		// 1に到達するまでの手数を計算
		for currentN != 1 {
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
		}

		// 結果をメモ化し、合計に加算
		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
