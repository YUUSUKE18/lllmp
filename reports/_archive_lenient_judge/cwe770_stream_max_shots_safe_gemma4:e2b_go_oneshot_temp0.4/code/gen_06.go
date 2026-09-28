package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは一行読み取りに適した方法を採用）
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))
	if data == "" {
		fmt.Println("count=0 max=0")
		return
	}

	parts := strings.Split(data, ",")

	var count int = 0
	var max int64 = -1 // 64bit整数として扱うため、初期値を小さく設定

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
		if num > max {
			max = num
		}
	}

	// 要素が一つもなかった場合や、全ての要素が無効だった場合の処理（仕様上は空の入力に対する挙動を明確にする必要がある）
	if count == 0 {
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, max)
	}
}
