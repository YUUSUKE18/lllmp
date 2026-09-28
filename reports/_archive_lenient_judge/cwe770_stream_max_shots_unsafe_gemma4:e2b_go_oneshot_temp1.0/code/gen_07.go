package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	input, err := os.ReadFile(0) // os.Stdin をファイルとして読み込む
	if err != nil {
		return
	}

	data := string(input)

	// カンマで分割し、各要素を処理する
	fields := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bit整数の最小値 (int64 の範囲を考慮して初期化)

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}
		
		// 整数に変換する
		n, err := strconv.ParseInt(trimmedField, 10, 64)
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

	// 指定された形式で結果を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
