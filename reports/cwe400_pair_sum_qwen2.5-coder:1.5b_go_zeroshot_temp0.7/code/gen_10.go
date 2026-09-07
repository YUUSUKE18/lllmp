package main

import (
	"fmt"
	"math"
)

func main() {
	var target, count int64
	fmt.Scan(&target)

	var pairs []int64
	for i := 0; i < target; i++ {
		var num int64
		fmt.Scan(&num)
		if num == 0 {
			break
		}
		pairs = append(pairs, num)
	}

	fmt.Println("pairs=", count)
}
