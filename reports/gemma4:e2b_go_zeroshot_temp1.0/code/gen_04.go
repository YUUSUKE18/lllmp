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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	inputLine := scanner.Text()

	// カンマで分割して文字列の配列にする
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)

	// 整数を処理する
	for _, part := range parts {
		// 前後の空白を削除
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

		// 重複チェックと格納
		uniqueNumbers[num] = true
	}

	// 個数と合計を計算する
	count := len(uniqueNumbers)
	sum := 0

	for num := range uniqueNumbers {
		// 合計は64bit整数で保持されることを想定（Goのint型はプラットフォーム依存だが、通常は十分）
		// 問題の制約上、合計が64bitに収まるので int64 を使用する。
		sum += int64(num)
	}

	// 結果を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
