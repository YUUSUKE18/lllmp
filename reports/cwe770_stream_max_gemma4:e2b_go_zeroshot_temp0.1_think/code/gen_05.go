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
	input, err := os.ReadFile(0) // os.Stdinを読み込む
	if err != nil {
		// 入力エラーが発生した場合（通常は無視されるが、念のため）
		return
	}

	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	// カンマで分割して要素のリストを得る
	parts := strings.Split(inputStr, ",")

	count := 0
	var maxValue int64 = -9223372036854775808 // int64の最小値に近い値で初期化 (負の無限大)
	foundValid := false

	for _, part := range parts {
		// 前後の空白を削除
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

		// 有効な整数が見つかった場合
		count++
		if val > maxValue {
			maxValue = val
		}
		foundValid = true
	}

	// 有効な要素が見つかった場合のみ結果を出力する
	if foundValid {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
