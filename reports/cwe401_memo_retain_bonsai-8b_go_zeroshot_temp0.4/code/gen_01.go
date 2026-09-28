package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

func main() {
	var numbers []int
	for {
		line := strings.NewReader(os.Stdin).Read()
		if line == nil {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		n, err := parseInt(line)
		if err != nil {
			continue
		}
		numbers = append(numbers, n)
	}

	memo := make(map[int]int)
	total := 0

	for _, n := range numbers {
		if n == 1 {
			continue
		}
		if m, ok := memo[n]; ok {
			total += m
			continue
		}
		memo[n] = 0
		count := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}
		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}

func parseInt(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	if n < 0 {
		return 0, fmt.Errorf("negative number")
	}
	return n, nil
}
