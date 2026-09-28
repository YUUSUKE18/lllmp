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
		// エラー処理（実際には競技プログラミング環境では入力がある前提）
		return
	}
	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数列を得る
	parts := strings.Split(inputStr, ",")

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

	count := int64(len(uniqueNumbers))

	// 結果を1行で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
