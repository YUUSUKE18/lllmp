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
		// 入力が空の場合は何も出力しない（仕様上、入力がない場合の振る舞いは明記されていないが、実用上はこれ）
		return
	}

	line := scanner.Text()
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1e18) // 64bit整数の範囲を考慮して非常に小さな値で初期化

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
		if n > maxValue {
			maxValue = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
