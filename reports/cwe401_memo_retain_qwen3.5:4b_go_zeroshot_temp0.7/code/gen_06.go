package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	mem := make(map[int64]int64)
	total := int64(0)

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}

		if n <= 0 {
			continue
		}

		if steps, ok := mem[n]; ok {
			total += steps
			continue
		}

		steps := int64(0)
		curr := n
		for curr != 1 {
			mem[curr] = steps
			if curr%2 == 0 {
				curr /= 2
			} else {
				curr = 3*curr + 1
			}
			steps++
		}
		mem[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
