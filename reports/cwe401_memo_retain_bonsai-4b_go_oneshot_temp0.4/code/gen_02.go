package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func countSteps(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != nil {
		return memo[n]
	}
	if n%2 == 0 {
		next := n / 2
		steps := countSteps(next)
		memo[n] = steps + 1
		return memo[n]
	} else {
		next := 3 * n + 1
		steps := countSteps(next)
		memo[n] = steps + 1
		return memo[n]
	}
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var totalSteps int
	for _, line := range strings.Fields(sc.Text()) {
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		// 1 以上に整数として読み取る
		if n < 1 {
			continue
		}
		// 1 以上に整数として読み取る
		// 1 を達するまでの步骤数を計算
		// 1 を達するまでの手数を计数
		steps := countSteps(n)
		totalSteps += steps
	}
	fmt.Printf("total=%d\n", totalSteps)
}
