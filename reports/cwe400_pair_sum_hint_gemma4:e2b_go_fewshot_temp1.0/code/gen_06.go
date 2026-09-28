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
		return // 1行目がない場合は終了
	}
	targetStr := scanner.Text()

	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return // 目標値の解析に失敗した場合は終了
	}

	var numbers []int64
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		// 整数として解釈を試みる
		if num, err := strconv.ParseInt(strings.TrimSpace(line), 10, 64); err == nil {
			numbers = append(numbers, num)
		}
	}

	n := len(numbers)
	count := 0

	// 2個の組の個数を求める
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
