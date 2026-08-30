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

	// 入力を文字列として扱い、カンマで分割
	content := string(input)
	parts := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bit整数の最小値で初期化 (負の無限大に近い値)
	found := false

	for _, part := range parts {
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
		found = true
	}

	// 要素数と最大値を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
