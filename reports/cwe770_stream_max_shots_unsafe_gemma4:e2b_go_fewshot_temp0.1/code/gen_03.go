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
	var maxValue int64 = -1 // 64bit整数を扱うため、初期値を適切に設定する

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		// カンマ区切りの整数列として処理する（例1, 2の形式を想定）
		parts := strings.Split(line, ",")
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			count++
			if n > maxValue {
				maxValue = n
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（ここでは無視して続行）
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
