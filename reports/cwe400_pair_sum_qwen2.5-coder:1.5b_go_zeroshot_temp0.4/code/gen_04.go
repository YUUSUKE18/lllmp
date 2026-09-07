package main

import (
	"fmt"
	"math"
)

func main() {
	var target int
	fmt.Scan(&target)

	var pairs int
	for i := 0; i < len(os.Args)-2; i++ {
		for j := i + 1; j < len(os.Args)-1; j++ {
			sum := math.Abs(float64(os.Args[i+2]) + float64(os.Args[j+2]))
			if sum == float64(target) {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
