package main

import (
	"bufio"
	"fmt"
	"os"
)

func solve(n int) int {
	if n == 0 {
		return 0
	}
	if visited, ok := cache[n]; ok {
		return visited
	}

	var step int
	curr := n
	for curr != 1 {
		if curr%2 == 0 {
			curr /= 2
		} else {
			curr = 3*curr + 1
		}
		step++
	}

	cache[n] = step
	return step
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var total int
	memorized := make(map[int]int)

	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue
		}
		
		n, err := fmt.Sscanf(line, "%d", &n)
		if n != 1 || err != nil {
			continue
		}

		steps := solve(n)
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
