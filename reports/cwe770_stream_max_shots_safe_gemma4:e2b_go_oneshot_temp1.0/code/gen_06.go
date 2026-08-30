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
	input, _ := reader.ReadString('\n')
	trimmedInput := strings.TrimSpace(input)

	if trimmedInput == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割し、各要素を整数に変換する
	parts := strings.Split(trimmedInput, ",")

	var count int
	var maxValue int64 = -1 // 64bitの最小値として初期化 (負の数が入力される可能性があるため)
	validCount := 0

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		num, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様通り)
			continue
		}

		validCount++
		if num > maxValue {
			maxValue = num
		}
	}

	fmt.Printf("count=%d max=%d\n", validCount, maxValue)
}
