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
	count := 0
	maxVal := int64(-1e18) // 64bitの範囲を考慮して非常に小さな値で初期化

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			n, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			count++
			if n > maxVal {
				maxVal = n
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（今回は単純化のため省略可能だが、実運用では考慮が必要）
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
