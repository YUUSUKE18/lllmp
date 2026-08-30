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
	input := strings.TrimSpace(line)

	if input == "" {
		fmt.Println("count=0 max=0")
		return
	}

	parts := strings.Split(input, ",")
	count := 0
	maxValue := int64(0)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err == nil {
			count++
			if num > maxValue {
				maxValue = num
			}
			found = true
		}
	}

	if !found {
		// 整数として有効な要素が一つもなかった場合、 count=0 max=0 とする（入力が空だった場合は既に処理済みだが念のため）
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
