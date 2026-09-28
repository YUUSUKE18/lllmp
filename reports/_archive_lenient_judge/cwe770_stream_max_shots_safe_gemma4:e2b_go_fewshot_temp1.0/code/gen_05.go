package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	input, err := os.ReadFile(0) // 0 は標準入力
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割して文字列の配列にする
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-1e18) // 十分大きな負の値で初期化 (int64の範囲内で最大値を探索するため)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
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

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
