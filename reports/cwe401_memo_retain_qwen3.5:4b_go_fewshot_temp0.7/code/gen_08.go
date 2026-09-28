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
	if step, ok := memo[n]; ok {
		return step
	}
	step := 1
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	memo[n] = step
	return step + collatzStep(n)
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int64
	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		n := int64(val)
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
