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

	// カンマで分割し、各要素を整数に変換しようとする
	parts := strings.Split(inputLine, ",")
	var numbers []int64

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈可能か試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
	}

	// 重複を除去する
	// 1. ソート
	sort.Slice(numbers, func(i, j int) bool {
		return numbers[i] < numbers[j]
	})

	// 2. 重複を除去 (ソート済みなので隣接要素を比較するだけで十分)
	var uniqueNumbers []int64
	if len(numbers) > 0 {
		uniqueNumbers = append(uniqueNumbers, numbers[0])
		for i := 1; i < len(numbers); i++ {
			if numbers[i] != numbers[i-1] {
				uniqueNumbers = append(uniqueNumbers, numbers[i])
			}
		}
	}

	// 個数と合計を計算
	count := int64(len(uniqueNumbers))
	var sum int64 = 0
	for _, num := range uniqueNumbers {
		sum += num
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
