package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]bool)
var total = 0

func getSteps(n int) int {
	if memo[n] {
		return memo[n]
	}
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		next := n / 2
		return 1 + getSteps(next)
	} else {
		next := 3*n + 1
		if next > 1 {
			return 1 + getSteps(next)
		}
		return 1
	}
	memo[n] = true
	return memo[n]
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := ""
		if !sc.Scan() {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		for _, s := range line {
			if s == ' ' {
				continue
			}
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n < 1 {
				continue
			}
			// 1 を達するまでの手数を計算
			steps := getSteps(n)
			total += steps
		}
		if !sc.Scan() {
			break
		}
	}
	fmt.Printf("total=%d\n", total)
}
