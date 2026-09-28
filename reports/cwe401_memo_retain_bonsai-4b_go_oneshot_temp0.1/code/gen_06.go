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
	var total 0
	for _, line := range sc.Text() {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		// 1 以上の整数を分けて読み取る
		nums := strings.Fields(line)
		for _, s := range nums {
			if s == "" {
				continue
			}
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n > 0 {
				total += calc(n)
			}
		}
	}
	fmt.Printf("total=%d\n", total)
}
