package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var input string
	if _, err := fmt.Scanln(&input); err != nil && input == "" {
		// 入力が空の場合（例：何も入力がない場合）は処理を終了または適切に扱う
		return
	}

	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (最大値を正しく比較するため)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
