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
	maxValue := int64(-1e18) // 十分大きな負の値で初期化 (64bit範囲内を想定)

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
		if num > maxValue {
			maxValue = num
		}
	}

	if count == 0 {
		// カンマ区切りの要素がすべて無効だった場合
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
