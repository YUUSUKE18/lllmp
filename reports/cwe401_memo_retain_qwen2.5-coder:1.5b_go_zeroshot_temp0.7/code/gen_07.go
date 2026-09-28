package main

import (
	"fmt"
)

func main() {
	var total, memo map[int]int
	var input string

	for {
		input = fmt.Scanln()
		if input == "" {
			break
		}
		n, _ := strconv.Atoi(input)
		if n == 0 {
			fmt.Println("total=0")
			continue
		}
		if total == nil {
			total = make(map[int]int)
		}
		if memo == nil {
			memo = make(map[int]int)
		}

		if total[n] == 0 {
			memo[n] = calcSteps(n, total, memo)
		}
		total[n] = memo[n]
		fmt.Println("total=", total[n])
	}
}

func calcSteps(n int, total, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + calcSteps(n/2, total, memo)
	}
	return 1 + calcSteps(3*n+1, total, memo)
}
