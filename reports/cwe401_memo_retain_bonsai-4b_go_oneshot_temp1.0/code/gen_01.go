package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func step(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		result := step(n / 2)
	} else {
		result := 3 * n + 1
	}
	memo[n] = result + 1
	return result
}

func solve() {
	total := 0
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := ""
		if !sc.Scan() {
			break
		}
		line = sc.Text()
		if line == "" {
			break
		}
		nums := strings.Fields(line)
		for _, s := range nums {
			if s == "" {
				continue
			}
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n <= 0 {
				continue
			}
			handCount := step(n)
			total += handCount
		}
	}
	fmt.Printf("total=%d\n", total)
}
