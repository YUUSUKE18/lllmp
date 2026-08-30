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

	maxVal := numbers[0]
	for _, n := range numbers {
		if n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
