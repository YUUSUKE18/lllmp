package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	cache := make(map[int64]int64)

	var total int64

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n <= 0 {
			continue
		}

		if n == 1 {
			continue
		}

		steps := 0
		for {
			if val, ok := cache[n]; ok {
				steps = val
				break
			}

			cache[n] = steps

			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			steps++
		}

		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
