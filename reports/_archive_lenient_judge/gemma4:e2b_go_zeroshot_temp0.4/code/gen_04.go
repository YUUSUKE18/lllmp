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

	// カンマで分割し、各要素を処理する
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)
	totalSum := int64(0)

	for _, part := range parts {
		// 前後の空白を除去
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

		// 重複チェックと合計の計算
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			totalSum += int64(num)
		}
	}

	// 個数を取得
	count := len(uniqueNumbers)

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
