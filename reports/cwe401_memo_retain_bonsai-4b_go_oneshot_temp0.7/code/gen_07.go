package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = map[int]int{}

func solve(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
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
		line, err := sc.Scan()
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n < 1 {
			continue
		}
		total += solve(n)
	}
	fmt.Printf("total=%d\n", total)
}
