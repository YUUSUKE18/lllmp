package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		steps := solve(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

func solve(n int) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	steps += solve(n)
	memo[n] = steps
	return steps
}
