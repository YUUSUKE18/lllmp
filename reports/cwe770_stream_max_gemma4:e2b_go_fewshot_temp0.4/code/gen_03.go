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
	if sc.Scan() {
		line := sc.Text()
		parts := strings.Split(line, ",")
		count := 0
		maxValue := int64(-1e18) // 十分に小さな値で初期化（64bit整数を想定）

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
		}

		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
