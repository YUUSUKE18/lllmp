package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		fields := []string{}
		for _, c := range line {
			if c >= '0' && c <= '9' {
				fields = append(fields, string(c))
			}
		}
		if len(fields) == 0 {
			continue
		}

		n, err := strconv.Atoi(fields[0])
		if err != nil {
			continue
		}

		if steps, ok := memo[n]; ok {
			total += steps
			continue
		}

		current := n
		steps := 0
		for current != 1 {
			memo[current] = int64(steps)
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3*current + 1
			}
			steps++
		}

		total += steps
		memo[1] = int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
