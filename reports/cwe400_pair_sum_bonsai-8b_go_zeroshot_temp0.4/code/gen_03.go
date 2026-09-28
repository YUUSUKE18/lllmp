package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var goal string
	var numbers []int

	// 第1行を入力
	fmt.Scanln(os stdin, &goal)

	// 次の行を入力し、整数として処理
	for {
		var line string
		fmt.Scanln(os stdin, &line)
		if line == "" {
			break
		}
		if num, err := strconv.Atoi(line); err == nil {
			numbers = append(numbers, num)
		}
	}

	// 目標値に合わせて2つの数を求める
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == goal {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}
