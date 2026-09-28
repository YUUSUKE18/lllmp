package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	cache := make(map[int64]int64)
	total := int64(0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		line = line[:len(line)-1] // Remove trailing newline
		if len(line) == 0 {
			continue
		}

		var n int64
		fmt.Sscanf(line, "%d", &n)
		
		if n < 1 {
			continue
		}

		if val, ok := cache[n]; ok {
			total += val
			continue
		}

		steps := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current = current / 2
			} else {
				current = 3*current + 1
			}
			steps++
		}

		cache[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
