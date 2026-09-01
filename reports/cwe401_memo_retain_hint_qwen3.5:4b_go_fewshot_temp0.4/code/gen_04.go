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

		var n int64
		fmt.Sscanf(line, "%d", &n)
		if err := sc.Err(); err != nil {
			break
		}

		if n < 1 {
			continue
		}

		if cached, ok := mem[n]; ok {
			total += cached
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
