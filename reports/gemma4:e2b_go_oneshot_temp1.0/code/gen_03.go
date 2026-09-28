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
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力がない場合は終了
		return
	}
	data := string(input)

	// カンマで分割して整数列を得る
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップ（Setとして機能させる）
	uniqueNumbers := make(map[int]bool)
	var totalSum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			totalSum += int64(num)
		}
	}

	count := len(uniqueNumbers)

	// 指定された形式で結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
