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

	// 目標値と合計値を計算
	sum := 0
	for _, num := range numbers {
		sum += num
	}

	// 合計値が目標値に合っている2つの数値の組を検索
	pairs := []int{}
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs = append(pairs, numbers[i])
				pairs = append(pairs, numbers[j])
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", len(pairs))
}
