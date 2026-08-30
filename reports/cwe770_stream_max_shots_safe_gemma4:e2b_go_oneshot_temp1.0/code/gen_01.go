package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile(0)
	content := string(input)

	// カンマで分割し、空白や空文字列をフィルタリングする
	parts := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	var max int64 = -1 // 64bit整数として扱うため初期値は十分小さい値に設定

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > max {
			max = num
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d max=%d\n", count, max)
}
