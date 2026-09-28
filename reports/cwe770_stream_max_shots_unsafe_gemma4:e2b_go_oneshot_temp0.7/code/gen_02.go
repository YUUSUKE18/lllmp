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
		// 入力が空の場合は何も出力しない（仕様上は整数列が与えられることを前提とするが、安全策として）
		return
	}
	line := scanner.Text()

	// カンマで分割
	fields := strings.Split(line, ",")

	count := 0
	var max int64 = -1 // 64bit整数なので初期値は十分に小さい値

	for _, field := range fields {
		// 前後の空白をトリム
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		// 整数に変換
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if n > max {
			max = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, max)
}
