package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

var memo = make(map[int]int)

func main() {
	scanner := os.NewScanner(os.Stdin)
	for scanner.Scan() {
		if err := scanner.Err(); err != nil {
			fmt.Println("Invalid input")
			os.Exit(1)
		}
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
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}
	if n < 1 {
		return 0, nil
	}
	return n, nil
}
