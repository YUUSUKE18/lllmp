package main

import (
	"bufio"
	"fmt"
	"os"
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
		if err != nil {
			continue
		}

		if result, ok := mem[n]; ok {
			total += result
			continue
		}

		count := 0
		current := n
		for current != 1 {
			key := current
			mem[key] = count
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}
		mem[current] = count
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
