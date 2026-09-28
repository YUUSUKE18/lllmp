package main

import (
	"fmt"
	"math"
)

var memo = make(map[int]int)

func Collatz(n int) int {
	if n <= 0 {
		return 0
	}
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		result := Collatz(n/2)
	} else {
		result := Collatz(3*n + 1)
	}
	memo[n] = result + 1
	return result
}

func main() {
	scanner := &scanner.Scan()
	for scanner.Scan() {
		nStr := scanner.Text()
		if nStr == "" {
			continue
		}
		n, err := strconv.Atoi(nStr)
		if err != nil {
			continue
		}
		if n < 1 {
			continue
		}
		total := 0
		for n > 0 {
			total += Collatz(n)
			n = n / 2 if n%2 == 0 else 3*n + 1
		}
		fmt.Printf("total=%d\n", total)
	}
}
