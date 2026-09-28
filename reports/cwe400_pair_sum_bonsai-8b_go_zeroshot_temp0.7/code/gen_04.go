package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var goalStr string
	var numbers []int

	// 第1行を目標値として読み込む
	fmt.Scanner.Scanln(&goalStr)
	if err := strconv.Atoi(goalStr); err != nil {
		fmt.Println("Invalid goal value")
		return
	}

	// 2行以降を整数として読み込む
	for {
		if err := fmt.Scan(&numbers); err == nil {
			break
		}
		if err != nil {
			fmt.Println("Invalid number")
			return
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

	fmt.Println("pairs=" + fmt.Sprintf("%d", pairs))
}
