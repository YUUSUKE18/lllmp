package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	countStr := os.Args[0]
	var count int
	if err := strconv.Atoi(countStr); err != nil {
		fmt.Println("invalid count")
		return
	}

	sum := 0
	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if num, err := strconv.Atoi(line); err != nil {
			continue
		}
		sum += num
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
