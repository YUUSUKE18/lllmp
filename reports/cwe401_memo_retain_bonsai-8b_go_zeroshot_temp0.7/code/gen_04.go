package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

func main() {
	var numbers []string
	for {
		if !os.Read stdin, numbers []string {
			break
		}
		for _, numStr := range numbers {
			if numStr == "" {
				continue
			}
			num, _ := strconv.Atoi(numStr)
			if num < 1 {
				continue
			}
			numbers = append(numbers, numStr)
			break
		}
	}

	memo := make(map[int]int)
	total := 0

	for _, numStr := range numbers {
		num, _ := strconv.Atoi(numStr)
		if num == 1 {
			continue
		}

		count := 0
		value := num
		seen := make(map[int]bool)
		seen[value] = true

		for value != 1 {
			if seen[value] {
				break
			}
			seen[value] = true
			if value%2 == 0 {
				value /= 2
			} else {
				value = 3*value + 1
			}
			count++
		}

		total += count
	}

	fmt.Printf("total=%d\n", total)
}
