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
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込む
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、空白や空文字列を無視して整数を抽出する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数も考慮するため）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if val > maxVal {
			maxVal = val
		}
	}

	// 結果を厳密に指定された形式で出力する
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
