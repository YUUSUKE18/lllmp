package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var line string
	// 標準入力から一行読み込む
	if _, err := fmt.Scanln(&line); err != nil && line == "" {
		// 入力が空の場合は終了
		return
	}

	// カンマで分割
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bit整数の最小値 (仮の値として、実データに応じて更新される)
	foundValid := false

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
		foundValid = true
	}

	// 要素数と最大値を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
