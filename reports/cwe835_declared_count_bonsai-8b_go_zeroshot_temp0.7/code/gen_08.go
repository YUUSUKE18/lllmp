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
		if !strconv.Atoi(line) {
			continue
		}
		count++
		val, _ := strconv.Atoi(line)
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
