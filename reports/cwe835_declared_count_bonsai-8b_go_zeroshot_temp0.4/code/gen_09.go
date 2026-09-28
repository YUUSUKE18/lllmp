package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	countStr := os.Args[1]
	sumStr := "0"

	if len(os.Args) > 1 {
		countStr = os.Args[1]
	}

	count, _ := strconv.Atoi(countStr)

	for i := 1; i < len(os.Args); i++ {
		line := os.Args[i]
		if n, err := strconv.Atoi(line); err == nil {
			sumStr += fmt.Sprintf("%d\n", n)
			count += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sumStr)
}
