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
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む（ここでは簡略化のため、ReadStringを使う方が実用的だが、厳密にGo標準機能のみで処理する）
	if err != nil {
		// エラー時は何も出力しない（またはエラーメッセージを出力しても良いが、仕様に従い無視）
		return
	}

	// 標準入力全体を文字列として読み込む
	data := strings.TrimSpace(string(input))

	if data == "" {
		// 入力が空の場合
		fmt.Println("count=0 max=-1") // または適切なデフォルト値。ここでは空のセットに対する処理を考慮する。
		return
	}

	// カンマで分割し、各要素を整数に変換する
	parts := strings.Split(data, ",")

	var count int
	var maxValue int64 = -1 // 64bit整数の範囲を考慮するため初期値を-1とする

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数に変換を試みる
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if num > maxValue {
			maxValue = num
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
