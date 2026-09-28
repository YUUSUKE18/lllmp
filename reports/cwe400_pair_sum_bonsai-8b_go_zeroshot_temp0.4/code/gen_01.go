package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var target string
	var numbers []int

	// 第1行を目標値として読み込む
	line := strings.NewReader("").ReadAllLines()
	for _, s := range line {
		if s == "" {
			continue
		}
		target, _ = strconv.Atoi(s)
	}

	// 前後の行を処理する
	for i := 1; i < len(line); i++ {
		lineStr := strings.NewReader(line[i]).ReadAllLines()
		for _, s := range lineStr {
			if s == "" {
				continue
			}
			num, _ := strconv.Atoi(s)
			numbers = append(numbers, num)
		}
	}

	// 目標値を満たす2つのペアを検索
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
