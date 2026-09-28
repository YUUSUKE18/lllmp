package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		if n == 1 {
			total += 0
			continue
		}

		if val, ok := memo[n]; ok {
			total += val
			continue
		}

		step := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3*current + 1
			}
			step++
		}

		memo[n] = step
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
