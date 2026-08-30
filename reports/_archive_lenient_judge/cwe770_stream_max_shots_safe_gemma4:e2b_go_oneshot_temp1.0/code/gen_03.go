package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは念のため）
	if err != nil {
		// エラー処理は省略、本番では適切なエラーハンドリングが必要だが、競プロ環境を想定
		return
	}

	data := string(input)
	// カンマで分割し、空白を無視して整数を抽出する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-9223372036854775808) // int64の最小値で初期化（最大値を求めるため）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
