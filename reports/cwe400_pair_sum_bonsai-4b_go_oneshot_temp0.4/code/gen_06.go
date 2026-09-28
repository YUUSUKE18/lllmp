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

	// 2 行目以降は整数として読み取る
	for {
		line, err := sc.Scan()
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		_, err = strconv.Atoi(line)
		if err != nil {
			continue
		}
		numbers = append(numbers, err == nil ? err : 0)
	}

	// 2 値の組を検索
	count := 0
	for i < len(numbers) {
		for j > i {
			if numbers[i] + numbers[j] == target {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
