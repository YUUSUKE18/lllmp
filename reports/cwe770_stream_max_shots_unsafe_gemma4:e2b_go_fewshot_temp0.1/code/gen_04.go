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
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（負の数も考慮するため）

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

			// 整数として解釈を試みる
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			// 要素数をカウント
			count++

			// 最大値を更新
			if val > maxVal {
				maxVal = val
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理（ここでは無視するが、厳密には考慮すべき）
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
