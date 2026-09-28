package main

import (
	"bufio"
	"fmt"
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
		result := solve(n/2)
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
		line := ""
		if !sc.Text() {
			break
		}
		line = sc.Text()
		sc.Scan()
		for _, s := range strings.Fields(line) {
			if s == "" {
				continue
			}
			if _, err := strconv.Atoi(s); err != nil {
				continue
			}
			total += solve(s)
		}
		if err := sc.Text(); err != nil {
			break
		}
	}
	fmt.Printf("total=%d\n", total)
}
