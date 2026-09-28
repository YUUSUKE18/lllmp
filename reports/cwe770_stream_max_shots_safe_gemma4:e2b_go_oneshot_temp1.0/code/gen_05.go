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

	// カンマで分割し、空白を含む要素をフィルタリングして整数に変換する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxVal := int64(-9223372036854775808) // int64の最小値で初期化 (Goのint64の範囲内)

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
		if num > maxVal {
			maxVal = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
