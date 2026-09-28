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

	content := string(input)
	// カンマで分割し、空白を含む要素を処理するために文字列をスペースで分割する
	parts := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	maxVal := int64(-9223372036854775808) // int64の最小値（負の無限大に近い値）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if num > maxVal {
			maxVal = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
