package main

import (
	"fmt"
	"math"
)

func main() {
	target := readInt()
	numbers := readInts()

	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}

func readInt() int {
	var n int
	fmt.Scan(&n)
	return n
}

func readInts() []int {
	var n int
	fmt.Scan(&n)
	numbers := make([]int, n)
	for i := 0; i < n; i++ {
		fmt.Scan(&numbers[i])
	}
	return numbers
}
