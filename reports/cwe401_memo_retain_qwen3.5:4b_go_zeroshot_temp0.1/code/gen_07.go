package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	mem := make(map[int64]int)
	mem[1] = 0

	scanner := bufio.NewScanner(os.Stdin)
	var total int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		n, err := fmt.Sscanf(line, "%d", &total)
		if n != 1 || err != nil {
			continue
		}

		val := int64(n)
		steps := 0
		for val != 1 {
			if v, ok := mem[val]; ok {
				steps = v
				break
			}
			if val%2 == 0 {
				val = val / 2
			} else {
				val = 3*val + 1
			}
			mem[val] = steps + 1
			steps++
		}

		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
