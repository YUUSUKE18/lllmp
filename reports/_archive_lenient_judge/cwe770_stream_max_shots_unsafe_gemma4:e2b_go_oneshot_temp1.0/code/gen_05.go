package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.Stdin.ReadString('\n')
	// カンマで分割し、各要素をトリムして整数に変換する
	fields := strings.Split(strings.TrimSpace(input), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (実質的には非常に大きな値)

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

	// 要素数と最大値を指定の形式で出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
