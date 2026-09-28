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
		steps = 1 + collatzStep(n/2)
	} else {
		steps = 1 + collatzStep(3*n+1)
	}
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		fields := []string{}
		for _, f := range line {
			if f == ' ' || f == '\t' || f == '\n' || f == '\r' {
				break
			}
			fields = append(fields, string(f))
		}
		if len(fields) == 0 {
			continue
		}
		num, err := strconv.ParseInt(fields[0], 10, 64)
		if err != nil {
			continue
		}
		total += collatzStep(num)
	}
	fmt.Printf("total=%d\n", total)
}
