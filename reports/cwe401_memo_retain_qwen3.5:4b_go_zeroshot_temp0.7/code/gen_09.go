package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	cache := map[int64]int{} // 64bit integer key, value is steps to reach 1

	var total int64
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = reader.String() // Ensure we read the line correctly (sometimes redundant but safe)
		// Skip empty lines or lines that cannot be parsed as integers
		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}
		if n < 1 {
			continue
		}

		steps := solve(n, cache)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

func solve(n int64, cache map[int64]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := cache[n]; ok {
		return val
	}

	steps := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	steps += solve(n, cache)
	cache[n] = steps
	return steps
}
