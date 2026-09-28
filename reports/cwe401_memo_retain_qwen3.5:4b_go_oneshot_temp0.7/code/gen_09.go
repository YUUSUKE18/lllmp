package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int)

func collatzStep(n int64) int {
	if v, ok := memo[n]; ok {
		return v
	}
	step := 0
	for n != 1 {
		step++
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
	}
	memo[n] = step
	return step
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSteps := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		fields := []string{}
		for _, f := range fields(line) {
			n, err := strconv.ParseInt(f, 10, 64)
			if err != nil || n <= 0 {
				continue
			}
			totalSteps += collatzStep(n)
		}
	}

	fmt.Printf("total=%d\n", totalSteps)
}
