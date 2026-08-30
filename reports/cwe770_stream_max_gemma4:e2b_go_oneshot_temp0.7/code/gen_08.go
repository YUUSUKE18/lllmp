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
	line := scanner.Text()

	// カンマで分割して、数値部分を取得する
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(0)
	hasValidNumber := false

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 有効な数値をカウントし、最大値を更新する
		count++
		if n > maxValue {
			maxValue = n
		}
		hasValidNumber = true
	}

	// 要素数と最大値を1行で出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
