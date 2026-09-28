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
		line := <-os.Scan(os.Stdin)
		if line == "" {
			break
		}
		if numStr := strconv.Atoi(line); numStr != 0 {
			count++
			sum += numStr
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
