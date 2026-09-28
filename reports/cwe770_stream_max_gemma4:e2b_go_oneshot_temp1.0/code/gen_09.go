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

	// カンマで分割して整数を抽出
	parts := strings.Split(line, ",")

	count := 0
	maxValue := int64(-1e18) // 64bit整数の最小値に近い大きな値で初期化 (実際には非常に大きな正の数で十分だが、負の数を考慮するため安全策を取るか、最初の要素で初期化する方が安全)
	hasNumbers := false

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
		if n > maxValue {
			maxValue = n
		}
		hasNumbers = true
	}

	// 数値が存在する場合のみ結果を出力
	if hasNumbers {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
