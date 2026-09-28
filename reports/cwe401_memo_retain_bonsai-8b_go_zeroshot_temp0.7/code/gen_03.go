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
		if !scanner.Err() {
			line := strings.TrimSpace(scanner.Text())
			if num, err := parseNumber(line); err == nil {
				memo[num] = computeSteps(num)
				fmt.Printf("total=%d\n", memo[num])
			}
		}
		if err := scanner.Err(); err != nil {
			fmt.Println("error:", err)
		}
	}

	fmt.Println("total=0")
}

func parseNumber(line string) (int, error) {
	num, err := 0
	for _, ch := range line {
		if ch >= '0' && ch <= '9' {
			num = num*10 + (ch-'0')
		} else {
			if err != nil {
				return 0, err
			}
			num = 0
		}
	}
	if num == 0 {
		return 0, nil
	}
	return num, nil
}

func computeSteps(n int) int {
	if n == 1 {
		return 0
	}
	if m, ok := memo[n]; ok {
		return m
	}
	count := 1
	for m := n; m != 1; m = m%2 == 0 ? m/2 : 3*m + 1 {
		if m == 1 {
			break
		}
		if m, ok := memo[m]; ok {
			count += memo[m]
			break
		}
	}
	memo[n] = count
	return count
}
