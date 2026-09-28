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

	step := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	step += collatzStep(n)

	memo[n] = step
	return step
}

func main() {
	r := bufio.NewReader(os.Stdin)
	total := int64(0)
	lineNum := 0

	for {
		line, err := r.ReadString('\n')
		if err != nil {
			break
		}

		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		parts := strings.Fields(line)
		if len(parts) == 0 {
			continue
		}

		n, err := strconv.ParseInt(parts[0], 10, 64)
		if err != nil {
			continue
		}

		step := collatzStep(n)
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
