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
		return
	}

	// 前後の行を処理する
	for {
		fmt.Scanln(os.Stdin, &line)
		if line == "" {
			break
		}
		if num, err := strconv.Atoi(line); err == nil {
			numbers = append(numbers, num)
		}
	}

	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == goal {
				pairs++
			}
		}
	}

	fmt.Println("pairs =", pairs)
}
