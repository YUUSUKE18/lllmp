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
	input, err := os.ReadFile(0) // os.Stdinのコンテンツを直接読み込むか、bufio.Readerを使う方法もあるが、ここではシンプルにファイル操作で対応
	if err != nil && len(input) == 0 {
		// 入力が空の場合は終了
		return
	}
	
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数列を得る
	parts := strings.Split(data, ",")
	
	uniqueNumbers := make(map[int64]bool)
	var totalSum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複を除外する
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			totalSum += n
		}
	}

	count := int64(len(uniqueNumbers))

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
