package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は何も出力しない
		return
	}
	line := scanner.Text()

	// カンマで分割して整数列を取得
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int64]struct{})
	var sum int64 = 0

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと合計計算
		if _, exists := uniqueNumbers[n]; !exists {
			uniqueNumbers[n] = struct{}{}
			sum += n
		}
	}

	count := len(uniqueNumbers)

	// 厳密に count=<個数> sum=<合計> の形式で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
