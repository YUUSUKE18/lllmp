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
	inputLine := scanner.Text()

	// カンマで分割
	parts := strings.Split(inputLine, ",")

	// 重複を除いた整数を格納するためのマップ
	seen := make(map[int]bool)
	var count int
	var sum int64 = 0

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数としてパースを試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと集計
		if !seen[num] {
			seen[num] = true
			count++
			sum += int64(num)
		}
	}

	// 結果の出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
