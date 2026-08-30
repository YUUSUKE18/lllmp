package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	cache := make(map[int64]int64)

	var total int64
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line, _ := reader.ReadString('\n')
		if line == "" {
			continue
		}
		n, err := fmt.Sscanf(line, "%d", &total)
		if n != 1 || err != nil {
			continue
		}

		steps := solve(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

func solve(n int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := cache[n]; ok {
		return val
	}

	steps := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		steps++
	}

	cache[n] = steps
	return steps
}
