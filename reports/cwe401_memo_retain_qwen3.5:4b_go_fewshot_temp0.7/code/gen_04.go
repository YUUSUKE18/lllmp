package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int64)

func hCollatz(n int64) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	steps := 0
	current := n
	for current != 1 {
		if current%2 == 0 {
			current = current / 2
		} else {
			current = 3*current + 1
		}
		steps++
	}
	memo[n] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSteps := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		fields := []int64{}
		for _, token := range splitInts(line) {
			fields = append(fields, token)
		}

		for _, n := range fields {
			totalSteps += hCollatz(n)
		}
	}

	fmt.Printf("total=%d\n", totalSteps)
}

func splitInts(line string) []int64 {
	var tokens []string
	s := line
	start := 0
	for i, r := range s {
		if (r >= '0' && r <= '9') || r == '-' {
			continue
		}
		if r == ' ' || r == '\t' || r == '\n' || r == '\r' || r == '\f' || r == '\v' {
			if start < i {
				tokens = append(tokens, s[start:i])
			}
			start = i + 1
		}
	}
	if start < len(s) {
		tokens = append(tokens, s[start:])
	}

	result := make([]int64, 0, len(tokens))
	for _, t := range tokens {
		val, err := strconv.ParseInt(t, 10, 64)
		if err != nil {
			continue
		}
		result = append(result, val)
	}
	return result
}
