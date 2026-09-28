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
	data := string(input)

	// カンマで分割し、前後の空白を除去して整数に変換する
	parts := strings.Split(data, ",")
	count := 0
	maxValue := int64(0)
	found := false

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様に基づき)
			continue
		}

		count++
		if !found || num > maxValue {
			maxValue = num
			found = true
		}
	}

	// 空の要素や数字が一つもなかった場合は、count=0, max=0 とする（または適切な初期値）
	if !found && count == 0 {
		// 入力が空または無効な場合、ここでは0を出力する
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
