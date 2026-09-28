package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	cached := make(map[int64]int)

	var total int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		total += collatzStep(n, cached)
	}

	fmt.Printf("total=%d\n", total)
}

func collatzStep(n int64, cached map[int64]int) int {
	if v, ok := cached[n]; ok {
		return v
	}
	step := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		step++
	}
	cached[n] = step
	return step
}
