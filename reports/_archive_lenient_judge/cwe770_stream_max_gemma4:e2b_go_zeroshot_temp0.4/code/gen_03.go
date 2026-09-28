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
	input, err := os.ReadFile(0) // os.Stdin を直接読み込む代わりに、ここでは標準入力全体を想定して処理する
	if err != nil {
		// エラーが発生した場合は終了（通常、競技プログラミング環境ではこのケースは稀だが念のため）
		return
	}

	inputStr := string(input)

	// カンマで分割し、各要素を文字列として保持する
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	var count int = 0
	var maxValue int64 = -1 // 最小値として非常に小さい値を初期化

	for _, part := range parts {
		// 空の要素や空白を除去する
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
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
