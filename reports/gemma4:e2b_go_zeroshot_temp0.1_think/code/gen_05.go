package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// エラー処理（EOFは許容される場合がある）
		return
	}

	// 入力文字列から改行文字などを除去し、カンマで分割する
	input = strings.TrimSpace(input)
	if input == "" {
		// 入力が空の場合は何も出力しない
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割
	parts := strings.Split(input, ",")

	// 重複を除いた整数を格納するためのセット（マップ）
	uniqueNumbers := make(map[int]struct{})
	var totalSum int64 = 0

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと格納
		if _, exists := uniqueNumbers[num]; !exists {
			uniqueNumbers[num] = struct{}{}
			// 合計を計算 (合計は64bit整数)
			totalSum += int64(num)
		}
	}

	// 結果を出力
	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
