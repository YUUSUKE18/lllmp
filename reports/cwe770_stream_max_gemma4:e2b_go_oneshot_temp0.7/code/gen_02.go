package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は何も出力しない（仕様上は発生しにくいが安全策）
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1e18) // 64bit整数の範囲を考慮し、非常に小さい値で初期化

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
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
