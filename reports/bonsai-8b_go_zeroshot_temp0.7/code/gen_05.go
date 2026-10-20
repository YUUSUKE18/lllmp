package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,4,5,6,6,6,7")
	uniqueNumbers := make(map[int]bool)
	sum := 0
	count := 0

	for _, s := range input {
		if numStr := strings.TrimSpace(*s); numStr != "" {
			n, err := strconv.Atoi(numStr)
			if err == nil {
				if !uniqueNumbers[n] {
					uniqueNumbers[n] = true
					sum += n
					count++
				}
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
