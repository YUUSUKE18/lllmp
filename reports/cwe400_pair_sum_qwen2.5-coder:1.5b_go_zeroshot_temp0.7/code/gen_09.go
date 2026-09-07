package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	// 目標値を取得
	target, err := strconv.Atoi(strings.TrimSpace(strings.SplitN(readInput(), "\n", 1)[0]))
	if err != nil {
		fmt.Println("Error: Invalid input format")
		return
	}

	// 2 行目以降の整数を取得
	var pairs int
	for _, line := range strings.Split(readInput(), "\n")[1:] {
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		pairs += num
	}

	fmt.Printf("pairs=%d\n", pairs)
}

func readInput() string {
	var input string
	fmt.Scanln(&input)
	return input
}
