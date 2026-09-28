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
	input, err := os.ReadFile(0) // os.Stdin を直接読むより ReadFile の方がシンプルだが、ここでは bufio.Reader を使う方針で進める
	if err != nil {
		// 入力エラーが発生した場合（通常は想定しないが念のため）
		return
	}
	inputStr := string(input)

	// カンマで分割して整数列を取得する
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	var count int = 0
	var maxValue int64 = -1 // 64bit整数の範囲を考慮するため、初期値を十分小さい値に設定（または最初の要素で上書き）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を標準出力に出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
