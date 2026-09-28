package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込む（ここではファイルディスクリプタ0を使用）
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を取得する
	parts := strings.Split(data, ",")

	count := 0
	maxVal := int64(-1e18) // 十分小さな値で初期化 (64bit範囲を考慮)

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
		if num > maxVal {
			maxVal = num
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
