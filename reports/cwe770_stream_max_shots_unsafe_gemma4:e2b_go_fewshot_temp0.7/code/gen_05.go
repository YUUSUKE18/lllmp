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
		// カンマ区切りの入力として処理する
		parts := strings.Split(line, ",")
		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err == nil {
				numbers = append(numbers, n)
			}
		}
	}

	if err := scanner.Err(); err != nil {
		// エラー処理はここでは省略するが、実運用では考慮すべき
	}

	count := len(numbers)
	if count == 0 {
		// 要素がない場合の処理（最大値の定義が難しいが、仕様に従うため0または適切な値を設定。今回は空の場合は0とする）
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
