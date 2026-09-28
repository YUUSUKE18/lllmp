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
	input, err := os.ReadFile(0)
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

	var count int
	var maxValue int64 = -1 // 64bit整数の最大値を保持するため、初期値を非常に小さい値に設定
	found := false

	for _, part := range parts {
		// 前後の空白をトリムする
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
		
		if !found || val > maxValue {
			maxValue = val
			found = true
		}
	}

	// 結果を出力
	if count > 0 {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
