package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは効率化のため）
	if err != nil {
		// エラー処理は省略するが、通常はここで終了する
		return
	}
	data := string(input)

	// カンマで分割して文字列の配列にする
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため)

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

		count++
		if val > maxVal {
			maxVal = val
		}
	}

	// 結果を厳密に1行で出力する
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
