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

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n == 1 {
			// nが1のときの手数は0
			totalSteps += 0
			continue
		}

		// メモ化のためのマップ
		memo := make(map[int64]int64)

		var calculateSteps func(n int64) int64
		calculateSteps = func(n int64) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var steps int64
			if n%2 == 0 {
				// nが偶数なら n/2
				steps = 1 + calculateSteps(n/2)
			} else {
				// nが奇数なら 3n+1
				steps = 1 + calculateSteps(3*n+1)
			}

			memo[n] = steps
			return steps
		}

		steps := calculateSteps(n)
		totalSteps += steps
	}

	fmt.Printf("total=%d\n", totalSteps)
}
