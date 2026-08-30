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
	step := 0
	if n%2 == 0 {
		step += 1 + collatzStep(n / 2)
	} else {
		step += 1 + collatzStep(3*n+1)
	}
	memo[n] = step
	return step
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := []int64{}
		for _, s := range parts {
			n, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue
			}
			parts = append(parts, n)
		}
		for _, n := range parts {
			total += collatzStep(n)
		}
	}
	fmt.Printf("total=%d\n", total)
}
