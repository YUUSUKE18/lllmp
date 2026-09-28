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
	// カンマで分割し、空白を除去して整数に変換する
	parts := strings.Split(strings.TrimSpace(content), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため)

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

	// 結果を厳密に1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
