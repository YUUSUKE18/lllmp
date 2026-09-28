package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から1行を読み込む
	input, err := os.ReadFile(0) // os.Stdin を直接読み込むか、bufioで読み込む
	if err != nil {
		return
	}
	line := strings.TrimSpace(string(input))

	if line == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割する
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(0)
	foundNumber := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視する (仕様に基づき、ここでは単純にスキップ)
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
		foundNumber = true
	}

	if !foundNumber {
		// 有効な整数が一つもなかった場合、count=0, max=0 とする (空の入力または非数値のみの場合)
		fmt.Printf("count=0 max=0\n")
	} else {
		// 最終的な結果を出力
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
