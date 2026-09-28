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
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	parts := strings.Split(line, ",")
	var count int
	var maxValue int64 = -1 // 64bit整数を想定し、初期値を非常に小さい値に設定
	found := false

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
		if n > maxValue {
			maxValue = n
		}
		found = true
	}

	// 要素数と最大値を1行で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
