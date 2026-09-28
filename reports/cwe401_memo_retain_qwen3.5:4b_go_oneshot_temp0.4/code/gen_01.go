package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int64)

func collatzStep(n int) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}
	step := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	step += collatzStep(n)
	memo[n] = step
	return step
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		parts := []int{}
		for _, c := range line {
			if c >= '0' && c <= '9' {
				parts = append(parts, int(c)-'0')
			} else {
				break
			}
		}
		if len(parts) == 0 {
			continue
		}
		n := 0
		for _, p := range parts {
			n = n*10 + p
		}
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
