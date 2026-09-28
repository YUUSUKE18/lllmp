package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int64)

func collatzStep(n int) int {
	if val, ok := memo[n]; ok {
		return int(val)
	}
	step := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		step++
	}
	memo[n] = int64(step)
	return step
}

func main() {
	var total int64
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		token, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if token <= 0 {
			continue
		}
		total += collatzStep(token)
	}
	fmt.Printf("total=%d\n", total)
}
