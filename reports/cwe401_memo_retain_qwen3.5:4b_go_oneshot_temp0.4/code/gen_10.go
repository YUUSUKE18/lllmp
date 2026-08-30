package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int64)

func collatzStep(n int64) int64 {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var steps int64
	if n%2 == 0 {
		steps = collatzStep(n / 2)
	} else {
		steps = collatzStep(3*n + 1)
	}

	memo[n] = steps + 1
	return steps + 1
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		steps := collatzStep(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
