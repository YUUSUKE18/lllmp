package main

import (
	"fmt"
	"math"
	"strconv"
)

func main() {
	var target int64
	fmt.Scan(&target)

	var count int64
	for i := 0; i < len(os.Args)-1; i++ {
		num, err := strconv.ParseInt(os.Args[i+1], 10, 64)
		if err == nil {
			count += 2 * num >= target && num*num <= target
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
