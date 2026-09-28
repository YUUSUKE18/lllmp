package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	line, err := r.ReadString('\n')
	if err != nil && len(line) == 0 {
		// 入力が空の場合
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割
	parts := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(0)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解析を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if !found || val > maxValue {
			maxValue = val
			found = true
		}
	}

	// 要素数と最大値を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
