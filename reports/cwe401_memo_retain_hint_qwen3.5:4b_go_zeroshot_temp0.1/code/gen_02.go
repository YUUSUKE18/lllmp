package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	cache := make(map[int64]int)
	total := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line[:len(line)-1] // Remove newline if present
		if len(line) == 0 {
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

		if val, ok := cache[n]; ok {
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

		cache[n] = step
		total += step
	}

	fmt.Printf("total=%d\n", total)
}
