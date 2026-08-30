package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int)

func collatzStep(n int64) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}
	var steps int
	if n%2 == 0 {
		steps += 1 + collatzStep(n/2)
	} else {
		steps += 1 + collatzStep(3*n+1)
	}
	memo[n] = steps
	return steps
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
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
		total += collatzStep(n)
	}

	fmt.Printf("total=%d\n", total)
}
