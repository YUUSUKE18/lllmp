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
	var maxValue int64 = -1 // 64bit整数として扱うため、初期値を適切に設定

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		// カンマ区切りの整数列を処理するため、一行全体をパースする
		parts := strings.Split(line, ",")

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			// 整数として解釈可能か試みる
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない場合は無視する (仕様に従う)
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

	// 最終結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
