package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var totalSteps int64 = 0
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil || n < 1 {
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int]int64)

		var calculateSteps func(n int) int64
		calculateSteps = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if result, ok := memo[n]; ok {
				return result
			}

			var steps int64 = 0
			current := n
			for current != 1 {
				if current%2 == 0 {
					current = current / 2
				} else {
					current = 3*current + 1
				}
				steps++
			}

			memo[n] = steps
			return steps
		}

		steps := calculateSteps(n)
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}
