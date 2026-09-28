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
		result := 3 * n + 1
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var values []int
	for _, line := range sc.Text().Split('\n', -1) {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		// 1 以上の整数を分離
		nums := strings.Fields(line)
		for _, s := range nums {
			if s == "" {
				continue
			}
			val, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if val > 0 {
				values = append(values, val)
			}
		}
	}
	if len(values) == 0 {
		fmt.Printf("total=0\n")
		return
	}
	total := 0
	for _, n := range values {
		total += calc(n)
	}
	fmt.Printf("total=%d\n", total)
}
