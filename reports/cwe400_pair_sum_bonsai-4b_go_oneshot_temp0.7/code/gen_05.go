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
	if _, err := sc.Scan(); err != nil {
		return
	}
	target, err := strconv.Atoi(sc.Text())
	if err != nil {
		return
	}

	// 2行目以降の整数を读む
	for {
		n, err := sc.Scan()
		if err != nil {
			return
		}
		if err != nil {
			return
		}
		if n == 0 {
			return
		}
		if n > 0 {
			numbers = append(numbers, n)
		}
	}

	// 目標値を達成する2値の組の個数を計算
	count := 0
	for i < len(numbers) {
		for j > i {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}
	fmt.Printf("pairs=%d\n", count)
}
