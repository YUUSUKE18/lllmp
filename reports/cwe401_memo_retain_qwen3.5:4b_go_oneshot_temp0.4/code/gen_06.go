package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int]int64)

func collatz(n int) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}
	var steps int64 = 0
	for n != 1 {
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		steps++
	}
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := fmt.Sscanf(line, "%d", &n)
		if n != 1 || err != nil {
			continue
		}
		total += collatz(n)
	}
	fmt.Printf("total=%d\n", total)
}
