package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行全体を読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーが発生した場合（通常は無視して終了）
		return
	}

	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	// カンマで分割して整数列を取得
	parts := strings.Split(inputStr, ",")

	// 重複を除いた整数を格納するためのセット（mapを使用）
	uniqueNumbers := make(map[int]bool)
	var sum int64 = 0

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)

		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計の計算
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			// 合計は64bit整数として計算
			sum += int64(num)
		}
	}

	// 結果を出力
	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
