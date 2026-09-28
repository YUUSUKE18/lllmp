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
		input := strings.TrimSpace(scanner.Text())
		if len(input) == 0 {
			continue
		}
		n, err := parseInt(input)
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
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
		}
		memo[n] = count
		fmt.Println("total=", count)
	}
}

func parseInt(s string) (int, error) {
	n, err := parse(s)
	if err != nil {
		return 0, err
	}
	if n < 1 {
		return 0, nil
	}
	return n, nil
}

func parse(s string) int {
	n := 0
	for _, c := range s {
		if c >= '0' && c <= '9' {
			n = n*10 + (c-'0')
		}
	}
	return n
}
