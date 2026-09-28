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
		line := scanner.Text()
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart != "" {
				if n, err := strconv.ParseInt(trimmedPart, 10, 64); err == nil {
					numbers = append(numbers, n)
				}
			}
		}
	}

	count := len(numbers)
	if count == 0 {
		// 空の入力の場合、count=0, max=0 または適切なデフォルト値を設定する。
		// ここでは、入力された有効な数値がない場合は count=0, max=0 とする。
		fmt.Printf("count=0 max=0\n")
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
