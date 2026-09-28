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
	data := string(input)

	// 入力をカンマで分割する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-1e18) // 十分大きな負の値で初期化 (64bit範囲内を考慮)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数としてパースを試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
