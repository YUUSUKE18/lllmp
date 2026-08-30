package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む（ここでは簡略化のため、通常はbufio.Readerを使うが、今回は文字列として処理する）
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、各要素を整数に変換する
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと合計の計算
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
		}
	}

	// 個数を取得
	count := len(uniqueNumbers)

	// 結果を1行で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
