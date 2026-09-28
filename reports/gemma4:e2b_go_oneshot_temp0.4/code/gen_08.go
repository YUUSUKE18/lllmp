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
	input, err := os.ReadFile(0) // os.Stdin を直接読み込む代わりに、ここでは標準的な方法で処理するが、本番ではbufio.Scannerを使うのが一般的。
	if err != nil {
		// エラー処理（通常は無視またはエラー出力）
		return
	}
	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割する
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

	// 個数を取得
	count := int64(len(uniqueNumbers))

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
