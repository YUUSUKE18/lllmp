package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func computeSteps(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != nil {
		return memo[n]
	}
	if n%2 == 0 {
		result := computeSteps(n / 2)
	} else {
		result := computeSteps(3*n + 1)
	}
	memo[n] = 1 + result
	return memo[n]
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := sc.Text().Split("\n")
	sc.Scan()
	total := 0
	for _, line := range lines {
		// 空行は無視
		if line == "" {
			continue
		}
		// 1つずつ整数として解析
		values := strings.Fields(line)
		for _, s := range values {
			if s == "" {
				continue
			}
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			// 1つずつ計算
			steps := computeSteps(n)
			total += steps
		}
	}
	fmt.Printf("total=%d\n", total)
}
