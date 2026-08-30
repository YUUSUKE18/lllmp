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

	// カンマで分割して、数値のみを抽出する
	parts := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	maxValue := int64(-1 << 63) // 最小の64bit整数として初期化（最大値比較のため）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様通り)
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
