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
		steps += 1 + collatzStep(n / 2)
	} else {
		steps += 1 + collatzStep(3*n + 1)
	}
	memo[n] = steps
	return steps
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
		for _, s := range []byte(line) {
			if '0' <= s && s <= '9' {
				digit := int64(s - '0')
				parts = append(parts, parts[len(parts)-1]*10+digit)
			} else {
				break
			}
		}

		if len(parts) == 0 {
			continue
		}

		n := parts[0]
		steps := collatzStep(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
