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
		// 入力が空の場合は何もしない（仕様上、入力がある前提だが安全策）
		return
	}

	line := scanner.Text()
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	seen := make(map[int]bool)
	var uniqueNumbers []int

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解析を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェック
		if !seen[num] {
			seen[num] = true
			uniqueNumbers = append(uniqueNumbers, num)
		}
	}

	// 個数と合計を計算
	count := len(uniqueNumbers)
	var sum int64 = 0

	for _, num := range uniqueNumbers {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
