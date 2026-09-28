package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	max := 0
	first := true
	memo := make(map[int]int)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > max {
			max = n
			first = false
		}
		memo[n] = floydWarshall(n, memo)
	}
	fmt.Printf("total=%d\n", memo[max])
}

func floydWarshall(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		memo[n] = floydWarshall(n/2, memo) + 1
	} else {
		memo[n] = floydWarshall(3*n+1, memo) + 1
	}
	return memo[n]
}
