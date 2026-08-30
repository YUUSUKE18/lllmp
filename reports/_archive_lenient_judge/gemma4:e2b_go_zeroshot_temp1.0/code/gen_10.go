package main

import (
	"bufio"
	"fmt"
	"os"
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
	uniqueNumbers := make(map[int]struct{})

	// 有効な整数をフィルタリングして重複を除去
	for _, part := range parts {
		// 前後の空白を削除
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
		uniqueNumbers[num] = struct{}{}
	}

	count := len(uniqueNumbers)
	var sum int64 = 0

	// 合計を計算
	for num := range uniqueNumbers {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
