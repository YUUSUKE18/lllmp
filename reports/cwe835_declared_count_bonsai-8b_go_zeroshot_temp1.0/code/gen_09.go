package main

import (
	"fmt"
	"strconv"
	"os"
)

func main() {
	count := 0
	sum := 0
	firstLine := os.Getenv("first_line")
	if firstLine != "" {
		_, err := strconv.Atoi(firstLine)
		if err == nil {
			count = 1
		}
	}
	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if line != "" {
			n, err := strconv.Atoi(line)
			if err == nil {
				count++
				sum += n
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
