package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、空白や空文字列をフィルタリングする
	parts := strings.Split(strings.TrimSpace(data), ",")

	var count int = 0
	var maxValue int64 = -1 // 64bit整数として扱うため、初期値を適切に設定

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様に従う)
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
