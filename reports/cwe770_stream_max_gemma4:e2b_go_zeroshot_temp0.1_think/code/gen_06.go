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
	reader := bufio.NewReader(os.Stdin)
	input, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		// エラー処理（通常は無視しても良いが、念のため）
		return
	}

	// 入力文字列から改行文字などを除去し、カンマで分割する
	input = strings.TrimSpace(input)
	if input == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	tokens := strings.Split(input, ",")

	count := 0
	var maxValue int64 = -1 << 63 // 64bit整数の最小値に近い値で初期化 (負の無限大に近い値)
	foundValid := false

	for _, token := range tokens {
		// 空白をトリム
		trimmedToken := strings.TrimSpace(token)
		if trimmedToken == "" {
			continue
		}

		// 整数として解析を試みる
		val, err := strconv.ParseInt(trimmedToken, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 有効な整数が見つかった
		count++
		foundValid = true

		// 最大値を更新する
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力する
	// countが0の場合、maxの値は定義されないが、仕様に従い計算された最大値をそのまま出力する。
	// ただし、入力が完全に無効な場合（count=0）は、最大値の出力は任意となるが、
	// ここでは計算された最大値をそのまま出力する。
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
