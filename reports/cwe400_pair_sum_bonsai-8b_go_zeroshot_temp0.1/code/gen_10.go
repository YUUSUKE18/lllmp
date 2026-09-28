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
		fmt.Println("0")
		return
	}

	// 前後の行を読み込む
	for {
		if !os.Scanln(os.Stdin, &target) {
			break
		}
		if err := strconv.Atoi(target); err != nil {
			continue
		}

		// 数値が整数である場合、読み込む
		if num, err := strconv.Atoi(target); err == nil {
			numbers = append(numbers, num)
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

	fmt.Println("pairs=" + strconv.Itoa(pairs))
}
