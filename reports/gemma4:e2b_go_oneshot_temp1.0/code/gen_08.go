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
	input, err := os.ReadFile(0) // os.Stdinの代わりにos.ReadFile(0)を使用
	if err != nil {
		// 入力エラーはここでは処理しない（問題の制約に従う）
		return
	}
	data := string(input)

	// カンマで分割し、空白を無視して整数に変換する
	parts := strings.Split(strings.TrimSpace(data), ",")

	// 重複を除いた整数を格納するためのマップを使用
	uniqueNumbers := make(map[int64]struct{})
	var totalSum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと合計の計算
		if _, exists := uniqueNumbers[n]; !exists {
			uniqueNumbers[n] = struct{}{}
			totalSum += n
		}
	}

	// 個数を取得
	count := int64(len(uniqueNumbers))

	// 結果を1行で出力
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
