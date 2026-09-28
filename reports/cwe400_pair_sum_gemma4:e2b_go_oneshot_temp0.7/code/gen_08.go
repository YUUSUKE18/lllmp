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
		return // 1行目が読めなかった場合
	}
	targetStr := scanner.Text()

	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return // 目標値が不正な場合
	}

	count := 0
	numbers := make([]int64, 0)

	// 2行目以降を読み込む
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		numbers = append(numbers, num)
	}

	// 2個の組の数を求める
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
