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
	fields := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(0)
	found := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数としてパース
		val, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// カウントと最大値の更新
		count++
		if val > maxValue {
			maxValue = val
		}
		found = true
	}

	if count == 0 {
		// すべての要素が無効または空だった場合
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
