package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int64)

func collatz(n int64) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[int(n)]; ok {
		return v
	}
	var steps int64
	if n%2 == 0 {
		steps += collatz(n / 2)
	} else {
		steps += collatz(3*n + 1)
	}
	memo[int(n)] = steps
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
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		total += collatz(n)
	}

	fmt.Printf("total=%d\n", total)
}
