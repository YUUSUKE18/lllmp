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
		step += collatzStep(n / 2)
	} else {
		step += collatzStep(3*n + 1)
	}
	memo[n] = step
	return step
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSteps := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		fields := []string{}
		for _, f := range line {
			if f >= '0' && f <= '9' {
				fields = append(fields, string(f))
			} else if len(fields) > 0 {
				break
			}
		}
		if len(fields) == 0 {
			continue
		}

		n, err := strconv.Atoi(fields[0])
		if err != nil {
			continue
		}

		totalSteps += collatzStep(n)
	}

	fmt.Printf("total=%d\n", totalSteps)
}
