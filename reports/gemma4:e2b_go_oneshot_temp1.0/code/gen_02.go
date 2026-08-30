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
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数列を取得
	parts := strings.Split(data, ",")

	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0
	count := 0

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

		// 重複を除いた整数のみを処理する
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
