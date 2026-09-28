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
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		step++
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
		step := collatzStep(parts[0])
		total += step
	}
	fmt.Printf("total=%d\n", total)
}
