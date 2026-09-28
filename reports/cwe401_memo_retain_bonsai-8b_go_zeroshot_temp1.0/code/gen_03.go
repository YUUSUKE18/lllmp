package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

var memo = make(map[int]int)

func compute(n int) int {
	if n == 1 {
		return 0
	}
	if m, ok := memo[n]; ok {
		return m
	}

	if n%2 == 0 {
		next := n / 2
	} else {
		next := 3*n + 1
	}

	count := 1 + compute(next)
	memo[n] = count
	return count
}

func main() {
	scanner := fmt.NewScanner(os.Stdin)
	for scanner.Scan() {
		s := strings.TrimSpace(scanner.Text())
		if s == "" {
			continue
		}
		num, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		if num < 0 {
			continue
		}
		total := 0
		for num != 1 {
			total += compute(num)
			num = num / 2 if num%2 == 0 else 3*num + 1
		}
		fmt.Printf("total=%d\n", total)
	}
}
