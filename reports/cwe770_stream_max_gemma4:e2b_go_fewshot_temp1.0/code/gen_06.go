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
		maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（実際には最初の有効な値で上書きされる）

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			count++
			if n > maxVal {
				maxVal = n
			}
		}

		// 要素が存在する場合のみ結果を出力する
		if count > 0 {
			fmt.Printf("count=%d max=%d\n", count, maxVal)
		}
	}
}
