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
	var target int

	// 最初の行は目標値
	line, err := sc.Scan()
	if err != nil {
		return
	}
	if line == "" {
		return
	}
	target, err := strconv.Atoi(line)
	if err != nil {
		return
	}

	// 2 行目以降は整数
	for {
		line, err := sc.Scan()
		if err != nil {
			return
		}
		if line == "" {
			return
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		numbers = append(numbers, n)
		if len(numbers) >= 2 {
			// 2 個の組が目標値を達成する
			for i := 0; i < len(numbers); i++ {
				for j := i + 1; j < len(numbers); j++ {
					if numbers[i]+numbers[j] == target {
						// 2 個の組を増加
						pairs++
						break
					}
				}
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
