package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	count := 0
	var numbers []int

	for sc.Scan() {
		line := sc.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n > 0 {
			numbers = append(numbers, n)
			if count == 0 {
				count = 1
			}
		}
	}

	if len(numbers) < 2 {
		fmt.Printf("pairs=0\n")
		return
	}

	# 2 位の整数を対象に検索
	// 2の値が目標に達する2つの組を出力
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
				break
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
