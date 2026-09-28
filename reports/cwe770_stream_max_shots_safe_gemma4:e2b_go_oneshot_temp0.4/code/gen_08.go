package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var input string
	// 標準入力全体を読み込む
	if _, err := os.Stdin.Read(make([]byte, 1024*1024)); err != nil && err.Error() != "EOF" {
		// エラーが発生しても続行する（通常は無視されることが多いが念のため）
	}
	
	// 標準入力からすべて読み込む
	data, err := os.ReadFile(0) // 0 は標準入力
	if err != nil {
		return
	}
	input = string(data)

	// カンマで分割し、空白を除去して整数を抽出する
	parts := strings.Split(strings.TrimSpace(input), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため)

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
		if num > maxValue {
			maxValue = num
		}
	}

	// 結果を厳密に1行で出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
