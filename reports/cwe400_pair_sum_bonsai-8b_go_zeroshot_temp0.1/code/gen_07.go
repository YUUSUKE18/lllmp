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
	fmt.Scanln(os.Stdin, &target)
	if err := strconv.Atoi(target); err != nil {
		fmt.Println("Invalid target value")
		return
	}

	// 前後の行を読み込む
	for {
		if err := strconv.Atoi(line); err != nil {
			if line == "" {
				break
			}
			fmt.Println("Invalid number")
			return
		}
		numbers = append(numbers, num)
		line = strings.NewReader(os.Stdin).Read()
		if line == "" {
			break
		}
	}

	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	fmt.Println("pairs =", pairs)
}
