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
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数を含む可能性を考慮し、十分大きい値）

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		parts := strings.Split(line, ",")
		
		currentCount := 0
		currentMax := int64(-1 << 63) // 各行での最大値を追跡するための初期値

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

			currentCount++
			if n > currentMax {
				currentMax = n
			}
		}

		if currentCount > 0 {
			count += currentCount
			if currentMax > maxVal {
				maxVal = currentMax
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（ここでは無視して続行）
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
