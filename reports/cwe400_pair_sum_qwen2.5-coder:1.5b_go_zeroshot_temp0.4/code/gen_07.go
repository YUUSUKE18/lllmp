package main

import (
	"fmt"
	"math"
)

func main() {
	target := 0
	fmt.Scan(&target)

	var count int
	for i := 0; i < len(os.Args)-2; i++ {
		for j := i + 1; j < len(os.Args)-1; j++ {
			sum := math.Abs(float64(os.Args[i+2]) + float64(os.Args[j+2]))
			if sum == float64(target) {
				count++
			}
		}
	}

	fmt.Println("pairs=", count)
}
