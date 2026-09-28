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
	var memo map[int]int
	var total int
	for _, n := range strings.Fields(sc.Text()) {
		if n == "" {
			continue
		}
		ni, err := strconv.Atoi(n)
		if err != nil {
			continue
		}
		if memo == nil {
			memo = make(map[int]int)
		}
		total += memo[ni] + fibonacci(ni)
		memo[ni] = fibonacci(ni)
	}
	fmt.Printf("total=%d\n", total)
}

func fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}
