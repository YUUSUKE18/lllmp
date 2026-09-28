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
		n, err := parseInt(line)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=0")
			continue
		}
		if m, ok := memo[n]; ok {
			fmt.Println("total=", m)
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
			if current > 0 && current <= 0x800000000000000000 {
				memo[current] = count
			}
		}
		fmt.Println("total=", count)
	}
}

func parseInt(s string) (int, error) {
	n, err := parse(s)
	if err != nil {
		return 0, err
	}
	if n < 1 {
		return 0, fmt.Errorf("number must be positive")
	}
	return n, nil
}

func parse(s string) (int, error) {
	p := strings.Index(s, " ")
	if p == -1 {
		return parseInt(s)
	}
	if p > 0 && !strings.HasPrefix(s[:p], "-") {
		return parseInt(s[:p])
	}
	if p > 0 && strings.HasPrefix(s[:p], "-") {
		n, err := parseInt(s[:p-1])
		if err != nil {
			return 0, err
		}
		return -n, nil
	}
	return parseInt(s[:p])
}
