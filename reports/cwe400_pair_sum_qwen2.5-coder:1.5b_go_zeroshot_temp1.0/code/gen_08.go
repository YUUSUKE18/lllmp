package main

import (
	"fmt"
	"math"
)

func main() {
	var target int64
	fmt.Scan(&target)

	var pairs = 0
	for _, line := range fmt.Sprintf("%s\n", os.Stdin).Split("\n") {
		if _, err := fmt.Sscanf(line, "%d", &num); err != nil {
			continue
		}
		if num == target {
			continue
		}
		if num <= 0 {
			continue
		}

		var i int
		for i = 0; i < pairs; i++ {
			num2 := target - num
			if num2 == num || num2 <= 0 {
				continue
			}
			fmt.Printf("%d\n", num2)
		}
		pairs++
	}

	fmt.Printf("pairs=%d\n", pairs)
}
