package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func calc(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != nil {
		return memo[n]
	}
	if n%2 == 0 {
		result := calc(n / 2)
	} else {
		result := calc(3*n + 1)
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var values []int
	for _, line := range strings.Fields(sc.Text()) {
		if strings.Contains(line, "") {
			continue
		}
		if strings.Contains(line, "") {
			continue
		}
		// 1 以上の整数を1行に1値ずつ並びめる
		// 1 以上の整数を1行に1値ずつ並びめる
		// 1 以上の整数を1行に1値ずつ並びめる
		// 1 以上の整数を1行に1値ずつ並びめる
		if _, err := strconv.Atoi(line); err == nil {
			values = append(values, n)
		}
	}
	total := 0
	for _, n := range values {
		total += calc(n)
	}
	fmt.Printf("total=%d\n", total)
}
