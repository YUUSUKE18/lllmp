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
	var count int
	var maxValue int64 = -1 // 64bit整数として扱うため、初期値を小さく設定

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		// カンマ区切りの整数列を処理するため、ここでは一行全体をカンマで分割するのではなく、
		// 入力全体を読み込んで処理する方が、複数の行にまたがるデータに対応しやすい。
		// 例題の形式に従い、標準入力全体を読み込む方式を採用する。
	}

	// 標準入力全体を読み込む
	data, err := os.ReadFile(0) // os.Stdin の内容を読み込む
	if err != nil {
		// エラー処理（通常は無視されることが多いが、念のため）
		return
	}

	inputStr := string(data)
	// カンマで分割
	parts := strings.Split(inputStr, ",")

	count = 0
	maxValue = -1 // 最小値として非常に小さい値を設定（64bit整数範囲内）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
