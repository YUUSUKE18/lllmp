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
		step += 1 + collatzStep(n / 2)
	} else {
		step += 1 + collatzStep(3*n+1)
	}
	memo[n] = step
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
		f, err := strconv.ParseInt(line, 10, 64)
		if err != nil || f <= 0 {
			continue
		}
		total += collatzStep(int(f))
	}

	fmt.Printf("total=%d\n", total)
}
