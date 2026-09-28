package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int64)

func steps(n int64) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}
	next := n / 2
	if n%2 != 0 {
		next = 3*n + 1
	}
	res := steps(next) + 1
	memo[n] = res
	return res
}

func main() {
	var total int64
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		total += steps(val)
	}
	fmt.Printf("total=%d\n", total)
}
