package main

import (
	"fmt"
	"math"
)

func main() {
	var target int
	fmt.Scan(&target)

	var pairs int
	for i := 0; i < target; i++ {
		var num int
		fmt.Scan(&num)
		if num == target {
			pairs++
		}
	}

	fmt.Println("pairs=", pairs)
}
