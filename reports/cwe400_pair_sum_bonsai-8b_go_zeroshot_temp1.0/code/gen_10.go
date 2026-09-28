package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var targetStr string
	var numbers []int

	// 第1行を目標値として読み込み
	line1 := strings.TrimSpace(fmt.Scan(os.Stdin))
	if line1 != "" {
		targetStr, _ = strconv.ParseInt(line1, 10, 64)
	}

	// ダループで行を読み込み、整数に変換
	for {
		line := strings.TrimSpace(fmt.Scan(os.Stdin))
		if line == "" {
			continue
		}
		if numStr, err := strconv.Atoi(line); err == nil {
			numbers = append(numbers, numStr)
		}
	}

	// 目標値と一致する2つの数を求める
	var pairs int
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == targetStr {
				pairs++
			}
		}
	}

	// 出力
	fmt.Printf("pairs=%d\n", pairs)
}
