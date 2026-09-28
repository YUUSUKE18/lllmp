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
			continue // 整数として解釈できない行は無視
		}

		// 再帰的な計算（メモ化付き）
		var count int64
		if n == 1 {
			count = 0
		} else {
			// nが偶数なら n/2、奇数なら 3n+1
			if n%2 == 0 {
				count = 1 + memo[n/2]
			} else {
				count = 1 + memo[3*n+1]
			}
		}

		// 途中経過をメモ化
		memo[n] = count
		total += count
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、厳密性を保つため）
	}

	// 最終結果を出力
	fmt.Printf("total=%d\n", total)
}
