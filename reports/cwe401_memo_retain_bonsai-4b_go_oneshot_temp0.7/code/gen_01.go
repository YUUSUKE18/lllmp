package main

import (
	"bufio"
	"fmt"
)

var memo = make(map[int]int)

func calc(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		result := calc(n/2)
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
		// 空行を無視
		if line == "" {
			continue
		}
		// 整数を抜き出し
		nums, err := strings.Fields(line)
		if err != nil {
			continue
		}
		for _, s := range nums {
			if s == "" {
				continue
			}
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n < 1 {
				continue
			}
			total += calc(n)
		}
	}
	fmt.Printf("total=%d\n", total)
}
