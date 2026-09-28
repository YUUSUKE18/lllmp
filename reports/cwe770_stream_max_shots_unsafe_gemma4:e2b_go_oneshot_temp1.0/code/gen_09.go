package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.Stdin.ReadString('\n')
	// 行全体を文字列として処理する
	content := strings.TrimSpace(input)

	if content == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を取得
	fields := strings.Split(content, ",")

	count := 0
	maxValue := int64(0)

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}
		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
