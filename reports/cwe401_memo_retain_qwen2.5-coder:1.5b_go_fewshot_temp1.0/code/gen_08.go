package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo map[int]int

func main() {
	memo = make(map[int]int)
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	sum := 0
	for _, q := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(q)
		if err != nil {
			continue
		}
		sum += f(n, memo)
	}
	fmt.Printf("total=%d\n", sum)
}

func f(n int, memo map[int]int) int {
	if n == 1 {
		return 0
	}
	if _, ok := memo[n]; ok {
		return memo[n]
	}
	if n%2 == 0 {
		result := f(n/2, memo) + 1
		memo[n] = result
		return result
	}
	result := f(3*n+1, memo) + 1
	memo[n] = result
	return result
}
