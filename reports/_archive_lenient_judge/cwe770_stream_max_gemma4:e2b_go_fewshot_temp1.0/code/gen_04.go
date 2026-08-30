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
	input, err := os.ReadFile(0) // os.Stdinの内容を読み込む（より安全な方法としてbufio.Readerを使用するのが一般的だが、ここではシンプルな実装とする）
	if err != nil {
		return
	}
	line := strings.TrimSpace(string(input))

	// カンマで分割し、各要素を整数に変換する
	parts := strings.Split(line, ",")
	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (実質的には最小値として扱う)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
