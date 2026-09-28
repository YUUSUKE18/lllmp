package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、空白を除去して整数としてパースする
	fields := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxVal := int64(0)
	foundNum := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様により)
			continue
		}

		count++
		if num > maxVal {
			maxVal = num
		}
		foundNum = true
	}

	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	} else {
		// 入力が全く無効な場合（要素が一つもなかった場合）の処理。この問題では、入力があればカウントされるはずだが、安全のため。
		fmt.Println("count=0 max=0")
	}
}
