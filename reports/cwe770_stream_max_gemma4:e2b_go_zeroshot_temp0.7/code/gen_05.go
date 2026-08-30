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
	input, err := os.ReadFile(0) // os.Stdin を直接読み込む代わりに、ここでは標準入力全体を想定して処理するが、より一般的な方法として bufio.Reader を使う。
	if err != nil {
		// エラー処理（通常、競技プログラミング環境ではこの部分は厳密には不要だが、堅牢性のために）
		return
	}

	// 標準入力全体を読み込み、文字列として扱う
	data := strings.TrimSpace(string(input))

	if data == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	// カンマで分割する
	parts := strings.Split(data, ",")

	var count int = 0
	var maxValue int64 = -1 // 64bit整数の範囲を考慮し、初期値を適切に設定 (最小値として-1や最小の可能性のある値)

	// 要素を解析する
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数として解釈できるか試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視 (仕様通り)
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
