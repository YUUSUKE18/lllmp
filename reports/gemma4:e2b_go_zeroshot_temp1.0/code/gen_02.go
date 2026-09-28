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

	// カンマで分割し、各要素を文字列として保持する
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	seen := make(map[int]struct{})
	var uniqueNumbers []int

	for _, part := range parts {
		// 前後の空白を削除
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数としてパースを試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェック
		if _, exists := seen[num]; !exists {
			seen[num] = struct{}{}
			uniqueNumbers = append(uniqueNumbers, num)
		}
	}

	// 合計を計算
	var totalSum int64 = 0
	for _, num := range uniqueNumbers {
		totalSum += int64(num)
	}

	// 個数を取得
	count := len(uniqueNumbers)

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
