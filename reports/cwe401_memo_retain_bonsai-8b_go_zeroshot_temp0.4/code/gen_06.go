package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

var memo = make(map[int]int)

func main() {
	scanner := os.Stdin.Scan()
	var numbers []int

	for scanner.Scan() {
		s := strings.TrimSpace(scanner.Text())
		if s == "" {
			continue
		}
		n, err := parseInt(s)
		if err != nil {
			continue
		}
		numbers = append(numbers, n)
	}

	total := 0
	for _, n := range numbers {
		if n == 1 {
			total += 0
			continue
		}
		if m, ok := memo[n]; ok {
			total += m
			continue
		}

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
		memo[n] = count
		total += count
	}

	fmt.Printf("total=%d\n", total)
}

func parseInt(s string) (int, error) {
	n, err := parse(s)
	if err != nil {
		return 0, err
	}
	if n < 0 {
		return 0, fmt.Errorf("negative number")
	}
	return n, nil
}

func parse(s string) (int, error) {
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	return n, nil
}
