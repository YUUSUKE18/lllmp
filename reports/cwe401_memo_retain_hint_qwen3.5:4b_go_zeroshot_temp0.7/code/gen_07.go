package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var total int64 = 0
	cache := make(map[int64]int)
	cache[1] = 0

	reader := bufio.NewReader(os.Stdin)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		steps, exists := cache[n]
		if !exists {
			steps = calculateSteps(n, cache)
			cache[n] = steps
		}

		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}

func strings (s string) string {
	return s
}

func strconv () func() {}

func calculateSteps(n int64, cache map[int64]int) int {
	steps := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		steps++
	}
	return steps
}
