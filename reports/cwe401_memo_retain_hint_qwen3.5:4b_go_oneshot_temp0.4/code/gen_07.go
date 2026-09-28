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
	if v, ok := memo[n]; ok {
		return v
	}
	var step int64
	if n%2 == 0 {
		step = collatzStep(n / 2) + 1
	} else {
		step = collatzStep(3*n+1) + 1
	}
	memo[n] = step
	return step
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		f, err := strconv.ParseInt(line, 10, 64)
		if err != nil || f < 1 {
			continue
		}
		total += collatzStep(f)
	}
	fmt.Printf("total=%d\n", total)
}
