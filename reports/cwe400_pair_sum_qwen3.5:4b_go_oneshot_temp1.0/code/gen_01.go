package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	sum := 0
	lineNum := 0

	for scanner.Scan() {
		input := scanner.Text()
		if input == "" {
			continue
		}

		val, err := fmt.Sscanf(input, "%d", &sum)
		if val != 1 || err != nil {
			continue
		}

		if lineNum > 0 {
			pairs := findPairs(val, sum, -val)
			fmt.Printf("pairs=%d\n", pairs)
			return
		}
		lineNum++
	}
}

func findPairs(currentSum, target int64, prevVal int64) int64 {
	counts := make(map[int64]int64)
	var found int64 = 0
	for k, v := range counts {
		found += v * int64(counts[currentSum-target+k])
	}
	return found
}
