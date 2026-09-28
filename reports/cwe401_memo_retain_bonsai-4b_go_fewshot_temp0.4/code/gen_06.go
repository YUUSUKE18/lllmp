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
	if _, exists := memo[n]; exists {
		return memo[n]
	}
	if n%2 == 0 {
		result := solve(n / 2)
	} else {
		result := solve(3*n + 1)
	}
	mem[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total 0
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if n == "" {
			continue
		}
		if _, err := strconv.Atoi(n); err != nil {
			continue
		}
		// n が1の場合は0
		if n == 1 {
			continue
		}
		// 1以上の整数を1行に読み、各の手数を計算
		handcount := 0
		for _, f := range strings.Fields(n) {
			handcount += solve(int(f))
		}
		total += handcount
	}
	fmt.Printf("total=%d\n", total)
}
