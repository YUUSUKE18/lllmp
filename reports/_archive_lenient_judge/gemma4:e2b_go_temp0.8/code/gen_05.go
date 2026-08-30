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

	// カンマで分割し、各要素を整数に変換しようとする
	parts := strings.Split(line, ",")
	seen := make(map[int]bool)
	uniqueNumbers := []int{}

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外
		if !seen[num] {
			seen[num] = true
			uniqueNumbers = append(uniqueNumbers, num)
		}
	}

	// 個数を求める
	count := len(uniqueNumbers)

	// 合計を求める
	var sum int64 = 0
	for _, num := range uniqueNumbers {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
