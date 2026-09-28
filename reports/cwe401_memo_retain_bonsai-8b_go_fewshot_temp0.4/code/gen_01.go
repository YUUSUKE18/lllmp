package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var numbers []string
	for {
		n, err := sc.Read()
		if err != nil {
			break
		}
		if n == "" {
			continue
		}
		num, err := strconv.Atoi(n)
		if err != nil {
			continue
		}
		if num == 1 {
			memo[num] = 0
			continue
		}
		if num in memo {
			continue
		}
		memo[num] = 1 + compute(next(num))
		// Add to numbers if not already present
		if num not in memo {
			numbers = append(numbers, num)
		}
	}
	fmt.Printf("total=%d\n", sum(memo))
}

func compute(n int) int {
	if n == 1 {
		return 0
	}
	if n in memo {
		return memo[n]
	}
	if n%2 == 0 {
		next := n / 2
	} else {
		next := 3*n + 1
	}
	memo[n] = 1 + compute(next)
	return memo[n]
}

func sum(memo map[int]int) int {
	total := 0
	for _, v := range memo {
		total += v
	}
	return total
}
