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
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む（実際にはbufio.Readerを使う方が一般的だが、ここではシンプルに）
	if err != nil {
		return
	}
	line := strings.TrimSpace(string(input))

	if line == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を取得する
	parts := strings.Split(line, ",")

	var count int = 0
	var maxValue int64 = -1 // 64bit整数として扱うため、初期値を小さく設定（または最初の要素で初期化）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
