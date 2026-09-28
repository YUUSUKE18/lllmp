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
		var n int64
		scanned, err := strconv.ParseInt(line, 10, 64)
		if err != nil || scanned <= 0 {
			continue
		}
		n = scanned

		if result, exists := mem[n]; exists {
			total += result
			continue
		}

		step := int64(0)
		current := n
		for current > 1 {
			key := current
			result, exists := mem[key]
			if !exists {
				mem[key] = step
			}
			step++
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
		}
		mem[n] = step
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
