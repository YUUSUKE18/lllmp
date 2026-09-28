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
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を取得
	parts := strings.Split(data, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数なので、最小値を初期値として設定（負の数を含む可能性があるため）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// カウントをインクリメント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
