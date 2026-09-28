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

	// カンマで分割し、空白を無視して整数を抽出する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(0)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
		found = true
	}

	if count == 0 {
		// 要素が一つもなかった場合、最大値は定義されないか、0とする（ここでは0とする）
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
