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
	input, err := os.ReadFile(0) // os.Stdin の内容を直接読み込むか、bufio.Reader を使うのが一般的だが、ここではシンプルにファイル読み込みで対応する
	if err != nil {
		// エラー処理（通常は標準入力の読み取りエラーなど）
		return
	}

	inputStr := string(input)

	// 入力文字列をカンマで分割する
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	var count int = 0
	var maxValue int64 = -1 // 最小値を想定し、初期値を非常に小さい値に設定

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
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
