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

	// 1行目を読み込み、目標値を設定
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	targetStr := strings.TrimSpace(line)
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return
	}

	// 2行目以降を読み込み、整数を格納
	numbers := []int64{}
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		trimmedLine := strings.TrimSpace(line)
		if trimmedLine == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(trimmedLine, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		numbers = append(numbers, num)
	}

	// 2個の組の数を求める
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
