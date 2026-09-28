package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func solve(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != nil {
		return memo[n]
	}
	if n%2 == 0 {
		result := solve(n / 2)
	} else {
		result := solve(3*n + 1)
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total 0
	for {
		line, err := sc.Scan()
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		if _, err := strconv.Atoi(line); err != nil {
			continue
		}
		// 1 以上の整数を1行に1値ずつ読み取る
		if _, err := solve(n); err != nil {
			continue
		}
		total += solve(n)
	}
	fmt.Printf("total=%d\n", total)
}
