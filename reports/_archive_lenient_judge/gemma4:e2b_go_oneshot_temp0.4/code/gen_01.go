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
		return
	}
	line := scanner.Text()

	// カンマで分割して整数を抽出する
	parts := strings.Split(line, ",")
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		// 前後の空白を除去
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複を除外する
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
		}
	}

	count := int64(len(uniqueNumbers))

	// 厳密に count=<個数> sum=<合計> の1行を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
