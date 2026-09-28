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
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	line := scanner.Text()

	// カンマで分割して整数を抽出する
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップを使用 (重複排除のため)
	uniqueNumbers := make(map[int]bool)
	var validNumbers []int

	for _, part := range parts {
		// 前後の空白をトリム
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

		// 重複チェックと格納
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			validNumbers = append(validNumbers, num)
		}
	}

	// 合計を計算する (int64型を使用)
	var sum int64 = 0
	for _, num := range validNumbers {
		sum += int64(num)
	}

	// 個数を取得する
	count := len(validNumbers)

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
