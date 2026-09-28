package main

import (
	"fmt"
	"math"
	"strconv"
)

func main() {
	var target int64
	fmt.Scan(&target)

	count := 0
	for i := 0; i < len(os.Args)-2; i++ {
		for j := i + 1; j < len(os.Args)-1; j++ {
			sum := strconv.ParseInt(os.Args[i+2], 10, 64) + strconv.ParseInt(os.Args[j+2], 10, 64)
			if sum == target {
				count++
			}
		}
	}

	fmt.Println("pairs=", count)
}
