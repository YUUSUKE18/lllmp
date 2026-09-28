package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int64)

func steps(n int64) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	var next int64
	if n%2 == 0 {
		next = n / 2
	} else {
		next = 3*n + 1
	}

	stepsVal := steps(next) + 1
	memo[n] = stepsVal
	return stepsVal
}

func main() {
	var total int64
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n < 1 {
			continue
		}

		total += steps(n)
	}

	fmt.Printf("total=%d\n", total)
}
