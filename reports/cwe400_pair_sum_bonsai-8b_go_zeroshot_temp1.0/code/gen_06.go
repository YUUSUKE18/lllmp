package main

import (
	"fmt"
	"strconv"
	"os"
)

func main() {
	var goal int
	scanner := bufio.NewScanner(os.Stdin)

	// 第1行に目標値を読み取る
	if !scanner.Scan() {
		fmt.Println("0")
		return
	}
	if err := strconv.Atoi(scanner.Text()); err != nil {
		fmt.Println("0")
		return
	}
	goal = scanner.Text()

	var pairs int
	var numbers []int

	// 前後を読む
	for scanner.Scan() {
		scanner.Text = scanner.Text() + "\n"
		if err := strconv.Atoi(scanner.Text); err != nil {
			continue
		}
		numbers = append(numbers, scanner.Text)
	}

	// 各数を足し合わせる
	sum := 0
	for _, num := range numbers {
		sum += int(num)
	}

	// 数組をすべてチェックする
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if sum == int(numbers[i]) + int(numbers[j]) {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
