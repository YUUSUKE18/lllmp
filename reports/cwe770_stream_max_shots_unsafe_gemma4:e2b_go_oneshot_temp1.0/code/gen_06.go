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
		// 入力が空の場合は何もしない
		return
	}

	line := scanner.Text()
	fields := strings.Split(line, ",")

	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値

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
		if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
