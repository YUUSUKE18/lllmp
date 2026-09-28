package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	count := 0
	sum := 0

	for {
		line := os.ReadLine()
		if line == "" {
			break
		}
		if num, err := strconv.Atoi(line); err == nil {
			count++
			sum += num
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
