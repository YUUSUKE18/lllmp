package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	var pairs int

	for _, line := range sc.Scan() {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		if _, err := strconv.Atoi(line); err != nil {
			continue
		}
		numbers = append(numbers, line)
	}

	if len(numbers) < 2 {
		pairs = 0
		fmt.Printf("pairs=0\n")
		return
	}

	target := strconv.Atoi(sc.Text().Split("\n", 1)[0])
	// 2 以上に整数を読み取る
	// 目標値を達成する2つの数の組を计数
	count := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
