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
		// 入力が空の場合は終了
		return
	}

	// カンマで分割
	parts := strings.Split(strings.TrimSpace(input), ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bit整数の最小値（負の無限大に近い値）
	found := false

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if val > maxValue {
			maxValue = val
			found = true
		}
	}

	// 要素数と最大値を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
