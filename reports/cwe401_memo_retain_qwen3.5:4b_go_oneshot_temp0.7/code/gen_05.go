package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func solve(n int64, memo map[int64]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}
	var step int
	if n%2 == 0 {
		step = solve(n/2, memo)
	} else {
		step = solve(3*n+1, memo)
	}
	memo[n] = step + 1
	return step + 1
}

func main() {
	var total int64 = 0
	mem := make(map[int64]int)
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		step := solve(n, mem)
		total += int64(step)
	}
	fmt.Printf("total=%d\n", total)
}
