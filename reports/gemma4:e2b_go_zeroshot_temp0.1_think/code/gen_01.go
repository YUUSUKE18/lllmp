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
		// エラー処理（通常は無視しても良いが、念のため）
		return
	}

	// 入力文字列から改行文字などを除去し、カンマで分割する
	inputStr := strings.TrimSpace(input)
	if inputStr == "" {
		// 入力が空の場合は終了
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割
	parts := strings.Split(inputStr, ",")

	// 重複を除いた整数を格納するためのセット（mapを使用）
	uniqueNumbers := make(map[int]bool)
	var sum int64 = 0

	for _, part := range parts {
		// 各要素の前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
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
			// 合計は64bit整数として保持
			sum += int64(num)
		}
	}

	// 結果を出力
	count := len(uniqueNumbers)
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
