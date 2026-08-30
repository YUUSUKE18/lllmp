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
	// 標準入力から一行を読み込む
	if _, err := fmt.Scanln(&input); err != nil && input == "" {
		// 入力が空の場合
		fmt.Println("count=0 max=0")
		return
	}

	parts := strings.Split(input, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (実際の入力に依存させるため、最初の要素で上書きする)

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

		// 最大値を更新する
		if n > maxValue {
			maxValue = n
		}
	}

	// countとmaxValueを出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
