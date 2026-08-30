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
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む（より確実な方法として、bufio.Scannerを使う）
	if err != nil {
		// エラー処理は簡略化し、本問の制約に合わせるためここでは省略するが、実際には考慮すべき。
		return
	}
	data := string(input)

	// カンマ区切りの文字列を分割して整数列を取得する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値 (int64の最大値未満で十分)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
