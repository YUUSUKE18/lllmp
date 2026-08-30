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

	// カンマで分割して整数に変換する
	parts := strings.Split(line, ",")
	uniqueNumbers := make(map[int]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複を除外する
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			sum += int64(num)
		}
	}

	count := len(uniqueNumbers)

	// 厳密に count=<個数> sum=<合計> の1行を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
