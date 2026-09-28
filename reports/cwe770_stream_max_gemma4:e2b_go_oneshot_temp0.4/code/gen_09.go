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
	input, err := os.ReadFile(0) // os.Stdin の内容を直接読み込む（または bufio.Reader を使う）
	if err != nil {
		return
	}
	inputStr := string(input)

	// カンマで分割して整数列を取得
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため)

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

	// 結果を厳密に指定された形式で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
