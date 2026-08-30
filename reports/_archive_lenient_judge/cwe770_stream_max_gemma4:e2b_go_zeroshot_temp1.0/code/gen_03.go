package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return // 入力が空の場合は終了
	}
	inputLine := scanner.Text()

	// カンマで分割して要素を抽出
	parts := strings.Split(inputLine, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の最小値として初期化。問題の制約から、入力が空の場合も考慮し、有効な最大値を求めるために-1などで初期化する

	// 有効な整数のみを処理
	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数として解析を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
