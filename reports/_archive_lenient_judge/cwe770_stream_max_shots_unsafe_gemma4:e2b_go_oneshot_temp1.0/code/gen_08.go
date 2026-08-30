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
		// 入力が空の場合は何もしない（またはエラー処理）
		return
	}
	line := scanner.Text()

	// カンマで分割
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-9223372036854775808) // int64の最小値で初期化（Goではint64の定数を使用）
	isFirst := true

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if isFirst || n > maxValue {
			maxValue = n
			isFirst = false
		}
	}

	// 厳密に count=<個数> max=<最大値> の形式で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
