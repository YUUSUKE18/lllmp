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
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは一行として扱うため、実際にはScannerを使う方が自然だが、指定に従い処理する）
	if err != nil {
		// エラー処理は省略し、想定される入力があるものとする
		return
	}

	content := string(input)
	
	// カンマで分割して整数列を取得
	parts := strings.Split(strings.TrimSpace(content), ",")

	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0
	count := 0

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

		// 重複を除いた整数を処理
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
			count++
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
