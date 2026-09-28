package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func step(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != nil {
		return memo[n]
	}
	if n%2 == 0 {
		result := step(n / 2)
	} else {
		result := step(3*n + 1)
	}
	memo[n] = 1 + result
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	for {
		line := ""
		sc.Scan()
		if line == "" {
			break
		}
		nums := strings.Fields(line)
		for _, s := range nums {
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n > 0 {
				// 0は考慮されないため、スキップする
				continue
			}
			// 1はスキップする
			if n == 1 {
				continue
			}
			// 値を1に到達するまでの手数を計算
			// 1は0
			result := step(n)
			total += result
		}
	}
	fmt.Printf("total=%d\n", total)
}
