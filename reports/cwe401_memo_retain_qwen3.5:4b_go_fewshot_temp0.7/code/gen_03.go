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
	steps := int64(0)
	for n > 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		steps++
	}
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
