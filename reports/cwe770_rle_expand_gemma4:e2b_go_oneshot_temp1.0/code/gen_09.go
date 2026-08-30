package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var input string
	if _, err := fmt.Scanln(&input); err != nil && input == "" {
		// 標準入力から一行全体を読み込む必要がある場合のためのフォールバック（ここではScanlnで十分だが念のため）
		scanner := bufio.NewScanner(os.Stdin)
		if scanner.Scan() {
			input = scanner.Text()
		}
	}

	if input == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	totalCount := 0
	totalSum := int64(0)

	// カンマで区切って各要素を処理
	parts := strings.Split(input, ",")

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		// ':' で分割して値と回数を取得
		keyValue := strings.Split(part, ":")
		if len(keyValue) != 2 {
			continue // 形式が不正な場合はスキップ
		}

		valueStr := strings.TrimSpace(keyValue[0])
		countStr := strings.TrimSpace(keyValue[1])

		var value int64
		var count int64

		// 整数に変換を試みる
		_, errV := fmt.Sscanf(valueStr, "%d", &value)
		_, errC := fmt.Sscanf(countStr, "%d", &count)

		if errV != nil || errC != nil {
			continue // 整数変換に失敗した場合はスキップ
		}

		if count > 0 {
			totalCount += int(count)
			totalSum += value * int64(count)
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
