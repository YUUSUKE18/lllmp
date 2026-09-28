package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	totalCount := 0

	// メモ化テーブル
	memo := make(map[int]int)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// メモ化された値があればそれを使用
		if val, ok := memo[n]; ok {
			totalCount += val
			continue
		}

		// 再帰または反復計算で手数を求める
		if n == 1 {
			memo[1] = 0
		} else if n%2 == 0 {
			// n が偶数なら n/2
			next := n / 2
			subCount := memo[next]
			memo[n] = 1 + subCount
		} else {
			// n が奇数なら 3n+1
			next := 3*n + 1
			subCount := memo[next]
			memo[n] = 1 + subCount
		}

		// 最後に totalCount を更新
		totalCount += memo[n]
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は競技プログラミングでは無視されることが多い）
	}

	fmt.Printf("total=%d\n", totalCount)
}
