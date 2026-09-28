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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	input := scanner.Text()

	// カンマで分割し、各要素を文字列として保持
	parts := strings.Split(input, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)
	// 整数として有効な要素を一時的に格納するスライス
	var validInts []int

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数としてパースを試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと格納
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			validInts = append(validInts, num)
		}
	}

	// 合計の計算 (64bit整数として扱うため int64 を使用)
	var sum int64 = 0

	for _, num := range validInts {
		sum += int64(num)
	}

	count := len(validInts)

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
