package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	line, err := r.ReadString('\n')
	if err != nil && len(line) == 0 {
		return
	}

	// カンマで分割
	parts := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(0)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if !found || num > maxValue {
			maxValue = num
			found = true
		}
	}

	if count == 0 {
		// 要素が一つも見つからなかった場合（空行や数字以外のみだった場合）
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
