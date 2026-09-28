package main

import (
	"bufio"
	"fmt"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var numbers []int
	var target int

	// 最初の行は目標値
	for _, line := range sc.Lines() {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		t, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		target = t
	}

	// 2 行目以降は整数として読み取
	for _, line := range sc.Lines() {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		numbers = append(numbers, n)
	}

	// 2 個の組（異なる位置）がtargetに加わるか？ はい
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
