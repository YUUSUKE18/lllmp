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
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込むために ReadFile を使用（ここではより直接的に bufio.Reader を使う方が一般的だが、ここではシンプルに処理）
	if err != nil {
		return
	}
	
	// 入力全体を文字列として扱う。カンマ区切りなので、改行や空白で分割する準備をする。
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を取得
	parts := strings.Split(data, ",")

	count := 0
	maxValue := int64(-9223372036854775808) // int64 の最小値で初期化 (ただし、入力値が負になる可能性があるため、最初の要素で初期化するのが安全)
	foundFirst := false

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

		count++

		if !foundFirst {
			maxValue = n
			foundFirst = true
		} else if n > maxValue {
			maxValue = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
