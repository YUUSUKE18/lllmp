package main

import (
	"fmt"
	"math"
	"os"
	"strings"
)

var memo = make(map[int]int)

func main() {
	// ライニング入力の処理
	lines := []string{}
	for {
		line := strings.NewReader(os.Stdin).Read()
		if line == "" {
			break
		}
		lines = append(lines, line.String())
	}

	total := 0
	for _, line := range lines {
		n, err := parseInt(line)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=<0>")
			continue
		}
		if m, ok := memo[n]; ok {
			fmt.Println("total=<", m, ">")
			continue
		}
		memo[n] = steps(n)
		total += m
	}
	fmt.Println("total=<", total, ">")
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

func steps(n int) int {
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
	memo[n] = 1 + steps(next)
	return memo[n]
}
