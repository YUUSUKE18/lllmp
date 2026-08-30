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
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := []int64{}
		for _, f := range []rune(line) {
			if f >= '0' && f <= '9' {
				parts = append(parts, int64(f-'0'))
			} else {
				break
			}
		}
		if len(parts) == 0 {
			continue
		}
		n := int64(0)
		for _, d := range parts {
			n = n*10 + d
		}
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
