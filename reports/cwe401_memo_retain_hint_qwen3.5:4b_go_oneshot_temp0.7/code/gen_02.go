package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int64)
	total := int64(0)
	first := true

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n == 1 {
			continue
		}

		current := n
		steps := int64(0)
		for current != 1 {
			key := current
			if stepsVal, ok := memo[key]; ok {
				steps += stepsVal
				break
			}
			memo[key] = steps

			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			steps++
		}

		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
