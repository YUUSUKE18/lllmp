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
		// 入力が空の場合は何も出力しない（仕様上、空の入力に対する具体的な指示はないが、処理を続行しない）
		return
	}
	inputLine := scanner.Text()

	// カンマで分割し、各要素を処理する
	parts := strings.Split(inputLine, ",")
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除いた集合を管理
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			sum += num
		}
	}

	count := len(uniqueNumbers)

	// 厳密に count=<個数> sum=<合計> という 1 行を出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
