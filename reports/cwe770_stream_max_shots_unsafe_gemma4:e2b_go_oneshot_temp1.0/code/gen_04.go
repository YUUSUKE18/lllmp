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
		// 入力がない場合は何も出力しない
		return
	}
	line := scanner.Text()

	// カンマで分割し、各要素を処理する
	fields := strings.Split(line, ",")
	count := 0
	maxValue := int64(0)
	found := false

	for _, field := range fields {
		// 前後の空白をトリム
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
		found = true
	}

	// 要素数と最大値を1行で出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
