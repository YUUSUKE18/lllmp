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
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな初期値

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			// 整数として解釈可能かチェック（64bit範囲内）
			val, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			count++
			if val > maxVal {
				maxVal = val
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（本課題では不要だが安全のため）
		// fmt.Fprintln(os.Stderr, "error reading standard input:", err)
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
