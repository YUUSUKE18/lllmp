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
		if err != nil || line == "" {
			break
		}

		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		step, hasStep := cache[n]
		if !hasStep {
			step = 0
			for n != 1 {
				hasStep = false
				if n%2 == 0 {
					n = n / 2
				} else {
					n = 3*n + 1
				}
				step++
			}
			cache[originalN] = step
		}

		total += step
	}

	fmt.Printf("total=%d\n", total)
}
