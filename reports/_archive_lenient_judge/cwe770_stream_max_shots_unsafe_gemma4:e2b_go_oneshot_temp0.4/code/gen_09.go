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
		// 入力が空の場合は何も出力しない
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bit整数の最小値 (int64の範囲)
	foundNumber := false

	for _, field := range fields {
		// 前後の空白をトリム
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

		count++
		if n > maxValue {
			maxValue = n
		}
		foundNumber = true
	}

	// 要素数と最大値を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
