package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	input, err := os.ReadFile(0) // os.Stdin を直接読み込む代わりに ReadFile を使用
	if err != nil {
		// エラー処理（通常、競技プログラミングでは無視されることが多いが、ここでは念のため）
		return
	}

	// 文字列として入力全体を扱う
	inputStr := string(input)

	// カンマで分割して整数列を取得
	// strings.Fields は空白区切りだが、カンマ区切りの場合も対応可能。
	// ここではカンマで分割し、各要素を再度処理する方が厳密性が高まる。
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue // 空要素は無視
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			continue // 整数として解釈できないものは無視
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を厳密に指定された形式で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
