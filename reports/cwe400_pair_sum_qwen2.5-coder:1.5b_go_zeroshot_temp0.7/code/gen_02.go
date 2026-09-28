package main

import (
	"fmt"
	"strconv"
)

func main() {
	target, err := strconv.ParseInt(readLine(), 10, 64)
	if err != nil {
		return
	}

	var pairs int
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	fmt.Println(fmt.Sprintf("pairs=%d", pairs))
}

func readLine() string {
	var input string
	fmt.Scanln(&input)
	return input
}
