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
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは一行として扱うため、実際にはScannerを使う方が自然だが、仕様に合わせて調整）
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数を抽出
	parts := strings.Split(data, ",")
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

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

		// 重複を除外
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
		}
	}

	count := int64(len(uniqueNumbers))

	// 厳密に count=<個数> sum=<合計> を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
