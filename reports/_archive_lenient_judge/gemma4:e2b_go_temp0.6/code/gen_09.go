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
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込む（通常はファイルディスクリプタ0）
	if err != nil {
		// エラー処理（ここでは無視して終了、仕様上は入力がある前提だが念のため）
		return
	}

	// 入力を文字列として取得し、空白や改行で分割する
	inputStr := strings.TrimSpace(string(input))
	if inputStr == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数を抽出する
	parts := strings.Split(inputStr, ",")

	// 重複を除いた整数を格納するためのマップを使用する
	uniqueNumbers := make(map[int]bool)
	var numbers []int

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと格納
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			numbers = append(numbers, num)
		}
	}

	// 合計を計算する (64bit整数として扱う)
	var sum int64 = 0
	for _, num := range numbers {
		sum += int64(num)
	}

	// 個数を取得する
	count := len(numbers)

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
