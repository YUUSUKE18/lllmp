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
		// エラー処理はここでは省略するが、通常はログ出力などを行うべき
		return
	}

	// 入力文字列から空白で分割する
	line := strings.TrimSpace(string(input))
	if line == "" {
		fmt.Println("count=0 max=0")
		return
	}

	parts := strings.Split(line, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数を想定し、十分小さな値で初期化。問題の制約から負の値は考慮しないが安全のため。

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
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
