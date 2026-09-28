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
	var res int64
	if n%2 == 0 {
		res = 1 + steps(n / 2)
	} else {
		res = 1 + steps(3*n + 1)
	}
	memo[n] = res
	return res
}

func main() {
	total := int64(0)
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
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
