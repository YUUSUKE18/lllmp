package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	mem := make(map[int64]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n <= 0 {
			continue
		}

		if cached, ok := mem[n]; ok {
			total += cached
			continue
		}

		step := int64(0)
		current := n
		for current != 1 {
			mem[current] = step
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			step++
		}
		mem[n] = step
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
