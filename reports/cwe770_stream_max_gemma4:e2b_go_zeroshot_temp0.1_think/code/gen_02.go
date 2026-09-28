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
		// 入力エラーが発生した場合（通常は標準入力からの読み込み）
		return
	}

	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		// 入力が空の場合は何も出力しない
		return
	}

	// カンマで分割して要素のリストを得る
	parts := strings.Split(inputStr, ",")

	count := 0
	var maxValue int64 = -9223372036854775808 // int64の最小値に近い値で初期化 (負の無限大に近い値)
	foundFirst := false

	for _, part := range parts {
		// 各要素の前後の空白を削除
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数としてパースを試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 有効な整数が見つかった場合
		count++

		if !foundFirst {
			// 最初の有効な値で最大値を初期化
			maxValue = val
			foundFirst = true
		} else {
			// 最大値を更新
			if val > maxValue {
				maxValue = val
			}
		}
	}

	// 最終結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
