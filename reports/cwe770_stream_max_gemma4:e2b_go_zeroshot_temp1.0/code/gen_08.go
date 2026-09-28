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
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーは無視するか、適切なエラー処理を行うが、ここでは実行を終了させる
		return
	}

	// 文字列として読み込んだ入力をスペースや改行で分割するのではなく、カンマ区切りとして処理するため、そのまま文字列として扱う
	data := strings.TrimSpace(string(input))

	if data == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	// カンマで分割して要素のリストを得る
	parts := strings.Split(data, ",")

	var count int64 = 0
	var maxValue int64 = -1 // 最小値を想定し、初期値を非常に小さい値に設定 (64bit整数なので十分)

	for _, part := range parts {
		// 各要素の前後の空白を削除する
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空の要素は無視
		}

		// 整数に変換を試みる
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
