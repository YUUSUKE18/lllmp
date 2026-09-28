package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = map[int]int{}

func calc_steps(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		result := calc_steps(n / 2)
	} else {
		result := 1 + calc_steps(3*n + 1)
	}
	memo[n] = result
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := sc.Text().Split("\n")
	total := 0
	for _, line := range lines {
		// 空行をスキップ
		if line == "" {
			continue
		}
		// 1行1値を分岐
		f := strings.Fields(line)
		for _, s := range f {
			if s == "" {
				continue
			}
			val, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			// 値を計算
			steps := calc_steps(val)
			total += steps
		}
	}
	fmt.Printf("total=%d\n", total)
}
