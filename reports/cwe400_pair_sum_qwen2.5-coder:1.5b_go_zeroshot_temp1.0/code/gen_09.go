package main

import (
	"fmt"
	"math"
)

func main() {
	target := readInt()
	count := 0
	found := false

	for i := 0; i < len(slice); i++ {
		for j := i + 1; j < len(slice); j++ {
			if slice[i]+slice[j] == target {
				count++
				found = true
			}
		}
		if found {
			break
		}
	}

	fmt.Println("pairs =", count)
}

func readInt() int {
	var input string
	fmt.Scanln(&input)
	result, err := strconv.Atoi(input)
	if err != nil {
		return 0
	}
	return result
}

var slice = []int{1, 3, 5, 7, 9, 11, 13, 15, 17, 19}
