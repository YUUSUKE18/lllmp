package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// 1行目：目標値を読み込む
	line, err := reader.ReadString('\n')
	if err != nil {
		// 入力がない場合は終了
		return
	}
	targetStr := strings.TrimSpace(line)
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の解析に失敗した場合は終了
		return
	}

	// 2行目以降を読み込む
	var numbers []int64
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break // EOF
		}
		trimmedLine := strings.TrimSpace(line)
		if trimmedLine == "" {
			continue // 空行は無視
		}

		// 整数として解析を試みる
		num, err := strconv.ParseInt(trimmedLine, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
	}

	// 足して目標値になる2個の組の数を数える
	count := 0
	n := len(numbers)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", count)
}
