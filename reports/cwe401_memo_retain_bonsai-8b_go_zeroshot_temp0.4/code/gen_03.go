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
	for {
		if !scanner.Scan() {
			break
		}
		s := strings.TrimSpace(scanner.Text())
		if s == "" {
			continue
		}
		n, err := parseInt(s)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=0")
			continue
		}
		count, result := collatzSteps(n)
		fmt.Printf("total=%d\n", result)
		memo[n] = result
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

func collatzSteps(n int) (int, int) {
	if n == 1 {
		return 0, 1
	}
	if memo[n] != 0 {
		return memo[n], 1 + memo[n]
	}
	if n%2 == 0 {
		next := n / 2
		count, _ := collatzSteps(next)
		memo[n] = 1 + count
		return count, 1 + count
	} else {
		next := 3*n + 1
		count, _ := collatzSteps(next)
		memo[n] = 1 + count
		return count, 1 + count
	}
}
