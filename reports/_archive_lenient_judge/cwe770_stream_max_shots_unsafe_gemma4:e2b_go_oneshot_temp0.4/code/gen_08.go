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
	input, err := os.ReadFile(0) // os.Stdin の内容を読み込む
	if err != nil {
		// エラー処理（通常、競技プログラミングでは無視されることが多いが、ここでは念のため）
		return
	}

	// 文字列としてデータを扱い、空白で分割する
	inputStr := string(input)
	fields := strings.Fields(inputStr)

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数も考慮するため）

	for _, field := range fields {
		// 整数に変換を試みる
		n, err := strconv.ParseInt(field, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を厳密に指定された形式で出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
