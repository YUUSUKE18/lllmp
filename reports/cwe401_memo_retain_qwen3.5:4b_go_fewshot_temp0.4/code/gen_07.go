package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int64)

func collatzStep(n int) int64 {
	if v, ok := memo[n]; ok {
		return v
	}
	step := 0
	if n == 1 {
		memo[n] = step
		return step
	}
	prev := n
	for prev != 1 {
		if prev%2 == 0 {
			prev = prev / 2
		} else {
			prev = 3*prev + 1
		}
		step++
	}
	memo[n] = int64(step)
	return step
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		step := collatzStep(n)
		total += step
	}
	fmt.Printf("total=%d\n", total)
}
