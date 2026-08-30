package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64 = 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			// n が 1 のときの手数は 0
			total += 0
			continue
		}

		// Memoization map for efficiency
		memo := make(map[int]int64)
		
		var count func(n int) int64
		count = func(n int) int64 {
			if n == 1 {
				return 0
			}
			if val, ok := memo[n]; ok {
				return val
			}

			var result int64
			if n%2 == 0 {
				// n が偶数なら n/2
				result = count(n / 2)
			} else {
				// n が奇数なら 3n+1
				result = 1 + count(3*n + 1)
			}

			memo[n] = result
			return result
		}

		total += count(n)
	}

	if err := scanner.Err(); err != nil {
		// Handle potential reading errors if necessary, though usually ignored for competitive programming style input
	}

	fmt.Printf("total=%d\n", total)
}
