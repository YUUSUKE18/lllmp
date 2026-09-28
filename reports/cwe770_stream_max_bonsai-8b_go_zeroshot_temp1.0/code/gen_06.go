package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	var numbers []string
	input := fmt.Scanln()

	for {
		if !input {
			break
		}

		s := strings.TrimSpace(input)
		if s == "" {
			break
		}

		// 文字列から整数を抽出
		i, _ := strconv.ParseInt(s, 0, 64)
		if i < 0 {
			continue // 質量が负の値は無視
		}

		numbers = append(numbers, fmt.Sprintf("%d", i))
		input = fmt.Scanln()
	}

	// 空の要素や無解釈の要素を除去
	trimmed := strings.TrimPrefix(strings.TrimSuffix(numbers, "\n"), "\t")
	elements := strings.Fields(trimmed)
	max := -1

	for _, e := range elements {
		if val, err := strconv.Atoi(e); err == nil {
			if val > max {
				max = val
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", len(elements), max)
}
