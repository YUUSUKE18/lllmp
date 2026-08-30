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
		// 入力が空の場合は何も出力しない（仕様上、入力があることを前提とするが、安全策として）
		return
	}

	line := scanner.Text()
	// カンマで分割して文字列スライスを取得
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1e18) // 64bit整数の範囲を考慮し、非常に小さい値で初期化する（-9223372036854775808に近い）

	for _, field := range fields {
		// 前後の空白を除去
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
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

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
