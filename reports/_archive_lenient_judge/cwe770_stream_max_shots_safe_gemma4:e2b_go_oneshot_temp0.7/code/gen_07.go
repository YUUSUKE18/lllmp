package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		return
	}

	// 入力を文字列として扱い、カンマで分割する
	content := string(input)
	parts := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（実際は入力に依存するため、-2^63が安全）

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
		if num > maxValue {
			maxValue = num
		}
	}

	// 結果を厳密に指定された形式で出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
