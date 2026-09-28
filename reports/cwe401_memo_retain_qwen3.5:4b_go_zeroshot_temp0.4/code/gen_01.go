package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var total int64 = 0
	cache := make(map[int64]int64)

	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = line[:len(line)-1]
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

		if steps, ok := cache[n]; ok {
			total += steps
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
