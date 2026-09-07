package main

import (
	"fmt"
	"math"
)

func main() {
	target := int64(fmt.Scanln())
	var pairs int64

	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	fmt.Println("pairs=", pairs)
}
