package main

import (
	"fmt"
	"math"
	"os"
	"strings"
	"unicode"
)

var memo = make(map[int]int)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		if r, err := scanner.Text(); err != nil {
			continue
		}
		if num, err := parseInt(r); err != nil {
			continue
		}
		if num == 0 {
			fmt.Println("total=0")
			continue
		}
		if num == 1 {
			fmt.Println("total=0")
			continue
		}
		if m, err := memo[num]; err == nil {
			fmt.Println("total=", m)
			continue
		}
		memo[num] = 1 + computeStep(num)
		fmt.Println("total=", computeStep(num))
	}

	fmt.Println("total=", computeTotal())
}

func parseInt(s string) (int, error) {
	n := 0
	for _, c := range s {
		if unicode.IsDigit(c) {
			n = n*10 + int(c-'0')
		} else {
			return 0, fmt.Errorf("invalid integer")
		}
	}
	return n, nil
}

func computeStep(n int) int {
	if n == 0 {
		return 0
	}
	if m, err := memo[n]; err == nil {
		return m
	}
	if n%2 == 0 {
		next := n / 2
	} else {
		next := 3*n + 1
	}
	return 1 + computeStep(next)
}

func computeTotal() int {
	total := 0
	for scanner.Scan() {
		if r, err := scanner.Text(); err != nil {
			continue
		}
		if num, err := parseInt(r); err != nil {
			continue
		}
		if num == 0 {
			continue
		}
		if m, err := memo[num]; err == nil {
			continue
		}
		total += m
	}
	return total
}
