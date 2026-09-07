package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	memo := map[int]int{}
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if n == 1 {
			total++
			continue
		}
		if _, ok := memo[n]; ok {
			total += memo[n]
			continue
		}
		memo[n] = recurse(n, memo)
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}

func recurse(n int, memo map[int]int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		memo[n] = recurse(n/2, memo) + 1
	} else {
		memo[n] = recurse(3*n+1, memo) + 1
	}
	return memo[n]
}
