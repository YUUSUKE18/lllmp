package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	mem := make(map[int64]int64)
	total := int64(0)
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}

		fmt.Sscanf(line, "%d", &n)
		if n == 0 || !isInteger(line) {
			continue
		}

		n = int64(n)
		total += solve(n, mem)
	}

	fmt.Printf("total=%d\n", total)
}

func isInteger(s string) bool {
	for _, r := range s {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}

func solve(n int64, mem map[int64]int64) int64 {
	if v, ok := mem[n]; ok {
		return v
	}

	steps := 0
	if n == 1 {
		mem[n] = steps
		return steps
	}

	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}

	mem[3] = 0 // Cache the initial state for the Collatz sequence starting at 3 (for future lookups)
	steps += solve(n, mem)
	mem[n] = steps
	return steps
}
