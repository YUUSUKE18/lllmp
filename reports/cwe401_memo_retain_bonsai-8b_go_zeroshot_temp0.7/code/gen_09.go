package main

import (
	"fmt"
	"math"
	"strings"
)

var memo = make(map[int]int)

func main() {
	var lines []string
	for {
		fmt.Scanln(&lines)
		if len(lines) == 0 {
			break
		}
	}
	for _, line := range lines {
		if s, err := strings.Atoi(line); err == nil {
			if s == 1 {
				fmt.Println("total=0")
				continue
			}
			if _, exists := memo[s]; exists {
				fmt.Printf("total=%d\n", memo[s])
				continue
			}
			count := 0
			current := s
			for current != 1 {
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				count++
				if current > 0 && current <= 0x800000000000000000 {
					memo[current] = count
				}
			}
			memo[s] = count
			fmt.Printf("total=%d\n", count)
		}
	}
	fmt.Println("total=0")
}
