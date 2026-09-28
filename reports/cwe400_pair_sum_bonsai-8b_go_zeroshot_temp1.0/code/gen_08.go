package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var target string
	var numbers []int

	// ターゲット値を読み込む
	scanner := new(strings.Scanner)
	if err := scanner.Scan(nil, &target); err != nil {
		fmt.Println("Invalid target value")
		return
	}

	// 数値を読み込む
	for {
		scanner.Scan(nil)
		if err := scanner.Scan(&numbers); err != nil {
			if err == strings.ErrScanInt {
				break
			}
			fmt.Println("Invalid number")
			return
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
