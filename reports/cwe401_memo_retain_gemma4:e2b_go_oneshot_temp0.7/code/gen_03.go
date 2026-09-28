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

	// メモ化テーブル
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

		// メモ化された結果があればそれを使用
		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		// 計算処理（メモ化を考慮）
		if n == 1 {
			memo[1] = 0
		} else if n%2 == 0 {
			// nが偶数なら n/2
			result := memo[n/2] + 1
			memo[n] = result
		} else {
			// nが奇数なら 3n+1
			result := memo[3*n+1] + 1
			memo[n] = result
		}

		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}
