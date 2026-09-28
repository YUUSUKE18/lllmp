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
	input, err := os.ReadFile(0) // os.Stdin を直接読み込む代替として、ここでは標準的な方法を使用するが、本番ではbufio.Readerを使うのが一般的。
	if err != nil {
		// エラー処理（通常はここではエラーメッセージを出力する必要があるが、仕様に従い無視またはプログラム終了）
		return
	}
	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		fmt.Println("count=0 max=0") // 入力が空の場合は 0, 0 を出力する（要素数と最大値が定義できないため）
		return
	}

	// カンマで分割
	parts := strings.Split(inputStr, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数として扱うため、初期値を十分小さい値に設定。要素が存在しない可能性も考慮して-1など。

	for _, part := range parts {
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
