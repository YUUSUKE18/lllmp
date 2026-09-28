package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	line, err := r.ReadString('\n')
	if err != nil && len(line) == 0 {
		return
	}

	// カンマで分割
	parts := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(-1e18) // 64bit整数の範囲を考慮して非常に小さな値で初期化

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// 空の要素が一つもなかった場合、最大値は意味を持たない（または初期値）だが、
	// 課題の意図に従い、読み込んだ有効な要素の数と最大値を出す。
	// もし要素が一つもなかった場合は、count=0, max=0 (あるいは適切なデフォルト)とする。
	if count == 0 {
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
