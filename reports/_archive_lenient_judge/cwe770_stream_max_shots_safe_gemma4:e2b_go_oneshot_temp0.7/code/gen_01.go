package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	var line string
	// 標準入力から一行読み込む
	if _, err := fmt.Scanln(&line); err != nil && line == "" {
		// 入力が空だった場合の処理（もしあれば）
		return
	}

	// カンマで分割する
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため)

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換する
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if num > maxValue {
			maxValue = num
		}
	}

	// 結果を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
