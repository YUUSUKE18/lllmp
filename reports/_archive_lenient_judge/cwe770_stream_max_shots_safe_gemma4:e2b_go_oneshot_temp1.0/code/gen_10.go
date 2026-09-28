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
		// エラー処理（通常は競技プログラミングでは省略されるが、ここでは念のため）
		return
	}

	content := string(input)
	// カンマで分割し、空白を含む要素をフィルタリングする
	parts := strings.Split(strings.TrimSpace(content), ",")

	var count int = 0
	var maxValue int64 = -1 // 64bit整数として最大値を保持するための初期値

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			continue // 整数として解釈できないものは無視
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// 結果を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
