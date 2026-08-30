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
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーが発生した場合（通常は発生しないが念のため）
		return
	}
	data := string(input)

	// カンマで分割して整数文字列のリストを取得
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値 (負の無限大に相当)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数への変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// カウントと最大値を更新する
		count++
		if val > maxVal {
			maxVal = val
		}
	}

	// 結果を厳密に指定された形式で出力
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
