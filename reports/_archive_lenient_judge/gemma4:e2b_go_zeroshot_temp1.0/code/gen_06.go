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
	inputLine := scanner.Text()

	// カンマで分割
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)
	// 整数として有効な値を保持するスライス
	var numbers []int

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェック
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			numbers = append(numbers, num)
		}
	}

	// 合計の計算（int64を使用）
	var sum int64 = 0
	for _, num := range numbers {
		sum += int64(num)
	}

	count := len(numbers)

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
