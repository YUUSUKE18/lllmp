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
		step += 1 + collatzStep(n/2)
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
		for _, f := range []rune(line) {
			if f >= '0' && f <= '9' {
				parts = append(parts, int64(f-'0'))
			} else if len(parts) > 0 {
				break
			}
		}
		if len(parts) == 0 {
			continue
		}
		var n int64
		for _, d := range parts {
			n = n*10 + d
		}
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
