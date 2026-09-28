package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	scanner := &scanner.Scan()
	var targetStr string
	var numbers []int

	if err := scanner.Scan(&targetStr); err != nil {
		fmt.Println("Invalid input")
		return
	}

	var target, err := strconv.Atoi(targetStr)
	if err != nil {
		fmt.Println("Invalid target value")
		return
	}

	var pairs int

	for {
		if err := scanner.Scan(&numbers); err == nil {
			break
		}
	}

	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}
