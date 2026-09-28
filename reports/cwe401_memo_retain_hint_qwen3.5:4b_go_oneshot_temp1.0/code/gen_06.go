package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int64]int64)

func step(n int64) int64 {
	if n == 1 {
		return 0
	}
	v, ok := memo[n]
	if ok {
		return v
	}

	steps := 1 + step((n/2) + (int64(n)%2)*(3))
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		tokens := []int64{}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		tokens = append(tokens, n)

		for _, val := range tokens {
			total += step(val)
		}
	}

	if err := sc.Err(); err != nil {
		fmt.Fprintf(os.Stderr, "Error reading input: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("total=%d\n", total)
}
