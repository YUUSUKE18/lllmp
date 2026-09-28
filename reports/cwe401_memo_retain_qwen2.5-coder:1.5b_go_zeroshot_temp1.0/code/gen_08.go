package main

import (
	"fmt"
	"math"
)

var memo map[int]int

func main() {
	memo = make(map[int]int)
	total := 0
	var input int

	for {
		fmt.Print("Enter a number: ")
		fmt.Scan(&input)
		if input == 0 {
			break
		}
		if _, exists := memo[input]; exists {
			total += memo[input]
			continue
		}
		num := input
		count := 0
		for num != 1 {
			if num%2 == 0 {
				num /= 2
			} else {
				num = 3*num + 1
			}
			count++
		}
		total += count
		memo[input] = count
	}
	fmt.Printf("total=%d\n", total)
}
