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
		// 入力が空の場合は何も出力しない（仕様上は入力がある前提だが安全のため）
		return
	}

	line := scanner.Text()
	fields := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数も考慮するため）
	found := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if n > maxValue {
			maxValue = n
		}
		found = true
	}

	// 要素が存在する場合のみ出力する（空の入力や全て無効な入力の場合を考慮）
	if found {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
