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
	line1 := strings.NewReader(strings.NewReader("")).Read()
	if err := strconv.Atoi(line1); err == nil {
		target = line1
	}

	// 前後の行を処理する
	for {
		line := strings.NewReader(strings.NewReader("")).Read()
		if err := strconv.Atoi(line); err == nil {
			numbers = append(numbers, int(line))
		} else if line == "" {
			break
		}
	}

	// 目標値を64bit整数に変換
	targetNum, err := strconv.Atoi(target)
	if err != nil {
		fmt.Println("Invalid target value")
		return
	}

	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if targetNum == numbers[i]+numbers[j] {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
