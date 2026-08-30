package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}
	line := sc.Text()

	// カンマで分割して要素を取得
	parts := strings.Split(line, ",")

	count := 0
	maxVal := int64(-9223372036854775808) // 64bit整数の最小値（安全のため）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if n > maxVal {
			maxVal = n
		}
	}

	// 指定された形式で出力
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
