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
	var maxValue int64 = -1 // 64bit整数を扱うため、初期値を適切に設定

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

		// 最大値を更新する
		if n > maxValue {
			maxValue = n
		}
	}

	// 結果を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
