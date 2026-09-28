package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

var memo = make(map[int]int)

func main() {
	scanner := os.Scan()
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		n, _ := parseInt(line)
		if n == 0 {
			continue
		}
		if m, ok := memo[n]; ok {
			fmt.Printf("total=%d\n", m)
			continue
		}
		m = 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			m++
			if current > 0 && current <= 2147483647 {
				memo[current] = m
			}
		}
		fmt.Printf("total=%d\n", m)
		memo[n] = m
	}
}

func parseInt(s string) (int, error) {
	n, _ := strconv.Atoi(s)
	if n < 1 {
		return 0, fmt.Errorf("invalid input: %s", s)
	}
	return n, nil
}
