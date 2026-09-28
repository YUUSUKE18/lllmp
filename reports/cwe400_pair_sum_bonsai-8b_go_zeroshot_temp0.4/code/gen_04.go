package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var goal string
	var numbers []int

	// 第1行を目標値として読み込む
	fmt.Scanln(os.Stdin, &goal)
	if err := strconv.Atoi(goal); err != nil {
		// 目標値が無効な場合、出力しない
		return
	}

	// 前後の行を読み込む
	for {
		fmt.Scanln(os.Stdin, &line)
		if line == "" {
			break
		}
		if err := strconv.Atoi(line); err != nil {
			// 整数が無効な場合は無視
			continue
		}
		numbers = append(numbers, line)
	}

	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if i != j && numbers[i]+numbers[j] == goal {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}
