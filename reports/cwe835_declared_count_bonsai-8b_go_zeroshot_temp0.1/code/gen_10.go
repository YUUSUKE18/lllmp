package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	countStr := os.Args[0]
	sumStr := "0"

	count, err := strconv.Atoi(countStr)
	if err != nil {
		return
	}

	// Read all lines after the first
	lines := []string{}
	for i := 1; i < len(os.Args); i++ {
		lines = append(lines, os.Args[i])
	}

	// Parse numbers from lines
	for _, line := range lines {
		num, err := strconv.Atoi(line)
		if err == nil {
			sumStr = strconv.FormatInt(int64(sumStr), 10) + strconv.FormatInt(int64(num), 10)
			count = count + 1
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sumStr)
}
