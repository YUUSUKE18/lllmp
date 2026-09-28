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
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ただし、問題の形式から一行で十分な場合が多いが、ここでは全てを考慮する）
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割して整数を抽出
	parts := strings.Split(data, ",")
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			sum += num
		}
	}

	count := int64(len(uniqueNumbers))

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
