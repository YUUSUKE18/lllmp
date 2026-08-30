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
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む（より安全な方法）
	if err != nil {
		return
	}
	line := strings.TrimSpace(string(input))

	if line == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数列を取得
	parts := strings.Split(line, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の範囲を考慮し、初期値を非常に小さい値に設定
	found := false

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
		found = true
	}

	if !found {
		// 有効な整数が一つもなかった場合 (入力が空または全て無効な場合)
		fmt.Println("count=0 max=0")
	} else {
		// 結果を出力
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
