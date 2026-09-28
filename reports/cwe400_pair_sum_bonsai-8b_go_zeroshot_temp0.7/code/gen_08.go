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
		fmt.Println("0")
		return
	}

	// 多くの行を処理
	for {
		if !os.ReadLine(os.Stdin) {
			break
		}
		line := strings.TrimSpace(os.TextLine(os.Stdin))
		if line == "" {
			continue
		}

		if err := strconv.Atoi(line); err != nil {
			continue
		}

		numbers = append(numbers, line)
	}

	// 個数は0と1のどちらか
	count := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if i, j >= 0 && j < len(numbers) && i < j {
				a, _ := strconv.Atoi(numbers[i])
				b, _ := strconv.Atoi(numbers[j])
				if a + b == goal {
					count++
				}
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
