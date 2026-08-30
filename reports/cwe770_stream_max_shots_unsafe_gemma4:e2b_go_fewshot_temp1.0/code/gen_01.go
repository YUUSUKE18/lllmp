package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int
	var maxValue int64 = -1 // 64bit整数として扱うため、初期値を適切に設定（問題文の制約から、負の数も考慮する必要がある）

	for scanner.Scan() {
		line := scanner.Text()
		// カンマ区切りの整数列を処理する
		fields := strings.Split(line, ",")
		for _, field := range fields {
			trimmedField := strings.TrimSpace(field)
			if trimmedField == "" {
				continue
			}

			n, err := strconv.ParseInt(trimmedField, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			// 要素数をカウント
			count++

			// 最大値を更新
			if n > maxValue {
				maxValue = n
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（ここでは無視しても良いが、堅牢性を高める）
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
