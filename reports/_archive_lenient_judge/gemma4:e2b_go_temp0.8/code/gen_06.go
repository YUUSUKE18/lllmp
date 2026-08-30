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
	line := scanner.Text()

	// カンマで分割
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)
	// 整数として有効なものを格納するためのスライス
	var numbers []int

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと格納
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			numbers = append(numbers, num)
		}
	}

	// 合計の計算 (64bit整数として扱うため int64 を使用)
	var sum int64 = 0
	for _, num := range numbers {
		sum += int64(num)
	}

	// 個数の計算
	count := len(numbers)

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
