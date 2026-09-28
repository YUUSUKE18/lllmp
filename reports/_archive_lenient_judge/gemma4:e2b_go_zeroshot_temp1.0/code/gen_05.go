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
	line := scanner.Text()

	// カンマで分割し、空白や空文字列を無視して整数を抽出する
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)
	var totalSum int64 = 0

	for _, part := range parts {
		// 前後の空白を削除
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
			totalSum += int64(num)
		}
	}

	// 個数を取得
	count := len(uniqueNumbers)

	// 結果を標準出力に出力
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
