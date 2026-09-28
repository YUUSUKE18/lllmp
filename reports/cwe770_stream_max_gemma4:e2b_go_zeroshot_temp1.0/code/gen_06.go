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
	input, err := os.ReadFile(0) // os.ReadFile(0) は標準入力から読み込む（ここでは読み込み方法としてファイルディスクリプタを使うが、通常はbufio.Readerを使うのが一般的。今回はシンプルにstdin全体を読むことを想定してtry-catch的な動作を考慮しつつ、直接文字列として処理する）
	if err != nil {
		// 標準入力からの読み込みが失敗した場合（例: EOFなど）、ここでは何も出力しないかエラーを出すが、仕様に従い不正な入力は無視する方針をとる
		return
	}
	inputStr := string(input)

	// 入力文字列をカンマで分割して要素を取得する
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の範囲を考慮し、初期値は非常に小さい値（または最初の要素で上書き）

	// 有効な整数のみを処理する
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

		// カウントと最大値を更新する
		count++
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
