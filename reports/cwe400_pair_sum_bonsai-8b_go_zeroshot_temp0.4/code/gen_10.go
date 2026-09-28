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

	// 前後を読む
	for {
		if err := strconv.Atoi(fmt.Scanln(os.Stdin)); err != nil {
			break
		}
		numbers = append(numbers, num)
	}

	// 空行を無視し、解析できない行も無視
	var validNumbers []int
	for _, num := range numbers {
		if err := strconv.Atoi(fmt.ScanLn(os.Stdin)); err != nil {
			fmt.Println("Invalid number")
			return
		}
		validNumbers = append(validNumbers, num)
	}

	// 目標値と足す数を計算
	pairs := 0
	for i := 0; i < len(validNumbers); i++ {
		for j := i + 1; j < len(validNumbers); j++ {
			if validNumbers[i]+validNumbers[j] == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
