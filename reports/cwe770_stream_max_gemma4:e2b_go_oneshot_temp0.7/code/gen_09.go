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
	if !scanner.Scan() {
		return
	}
	input := scanner.Text()

	// カンマで分割
	parts := strings.Split(input, ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bit整数の最小値（安全のため）

	for _, part := range parts {
		// 空白をトリムして整数に変換試行
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
	}

	// 指定された形式で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
