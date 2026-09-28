package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	var goalStr string
	var numbers []int

	// 第1行を目標値として読み込む
	line1 := strings.NewReader(strings.NewReader("")).Read()
	if unicode.IsDigit(line1) {
		goalStr = line1
	}

	// 後続の行を読み取り、整数として処理
	for {
		line := strings.NewReader(strings.NewReader("")).Read()
		if line == "" {
			break
		}
		if unicode.IsDigit(line) {
			numStr := line
			if numStr == "0" {
				numStr = "1"
			}
			num, err := strconv.Atoi(numStr)
			if err == nil {
				numbers = append(numbers, num)
			}
		}
	}

	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == goalStr {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
