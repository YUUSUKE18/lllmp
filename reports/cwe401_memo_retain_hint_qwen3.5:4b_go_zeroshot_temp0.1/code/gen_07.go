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

		steps := 0
		curr := n
		for curr != 1 {
			if curr%2 == 0 {
				curr = curr / 2
			} else {
				curr = 3*curr + 1
			}
			steps++
		}

		cache[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
