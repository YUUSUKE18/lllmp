package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)
var total = 0

func computeSteps(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		next := n / 2
		return 1 + computeSteps(next)
	} else {
		next := 3 * n + 1
		// 奇数が1になるまで計算
		if next == 1 {
			return 1
		}
		return 1 + computeSteps(next)
	}
	memo[n] = computeSteps(n)
	return memo[n]
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := sc.Text()
		if line == "" {
			break
		}
		for _, f := range strings.Fields(line) {
			if _, err := strconv.Atoi(f); err == nil {
				n := f
				if n > 0 {
					steps := computeSteps(n)
					total += steps
				}
			}
		}
	}
	fmt.Printf("total=%d\n", total)
}
