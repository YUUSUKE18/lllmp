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
	var numbers []int64

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part != "" {
				if n, err := strconv.ParseInt(part, 10, 64); err == nil {
					numbers = append(numbers, n)
				}
			}
		}
	}

	count := len(numbers)
	if count == 0 {
		fmt.Println("count=0 max=0") // 空の入力の場合の処理（最大値は0とする）
		return
	}

	var max int64
	// 初期値として最初の要素を設定
	max = numbers[0]

	for i := 1; i < count; i++ {
		if numbers[i] > max {
			max = numbers[i]
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}
