package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から1行を読み込む
	input, err := os.ReadFile(0) // os.Stdinの内容を直接読み込む（ここではより安全な方法を採用）
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	// カンマで分割し、重複を除いた整数を格納する
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	if data != "" {
		parts := strings.Split(data, ",")
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err == nil {
				// 重複をチェック
				if !uniqueNumbers[n] {
					uniqueNumbers[n] = true
					sum += n
				}
			}
		}
	}

	count := len(uniqueNumbers)

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
