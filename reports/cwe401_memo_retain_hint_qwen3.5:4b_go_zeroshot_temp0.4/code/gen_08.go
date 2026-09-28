package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var total int64 = 0
	cache := make(map[int]int64)

	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = line
		line = trimLine(line)
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		steps, _ := getSteps(n, cache)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}

func trimLine(s string) string {
	s = strings.TrimSpace(s)
	return s
}

func getSteps(n int, cache map[int]int64) (int64, error) {
	if n == 1 {
		return 0, nil
	}
	if val, ok := cache[n]; ok {
		return val, nil
	}

	steps := 1
	current := n
	for current != 1 {
		if current%2 == 0 {
			current = current / 2
		} else {
			current = 3*current + 1
		}
		steps++
	}

	cache[n] = int64(steps)
	return steps, nil
}
