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
	var count int
	var maxValue int64 = -1 // 64bit整数を扱うため、初期値を適切に設定（負の数も考慮できるように）

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		// カンマ区切りの整数列として処理する
		parts := strings.Split(line, ",")
		currentCount := 0
		currentMax := int64(-1) // この行の最大値を追跡

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}

			// 整数として解釈を試みる (int64は64bit範囲に収まるため安全)
			n, err := strconv.ParseInt(part, 10, 64)
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
			// 全体のカウントと最大値を更新
			count += currentCount
			if currentMax > maxValue {
				maxValue = currentMax
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（通常は無視されることが多いが、厳密性を保つため）
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
