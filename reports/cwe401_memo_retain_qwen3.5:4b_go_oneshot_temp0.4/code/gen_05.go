package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int)

func steps(n int64) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}
	var s int
	if n%2 == 0 {
		s = steps(n / 2) + 1
	} else {
		s = steps(3*n+1) + 1
	}
	memo[n] = s
	return s
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		total += steps(n)
	}
	fmt.Printf("total=%d\n", total)
}
