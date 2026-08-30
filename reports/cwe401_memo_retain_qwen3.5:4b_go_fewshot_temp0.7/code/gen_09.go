package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	mem := make(map[int]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if n == 1 {
			total += 0
			continue
		}

		if result, ok := mem[n]; ok {
			total += result
			continue
		}

		count := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3*current + 1
			}
			count++
		}

		mem[n] = int64(count)
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
