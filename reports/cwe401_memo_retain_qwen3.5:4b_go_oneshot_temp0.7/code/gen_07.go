package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func f(n int) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	count := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	count += f(n)
	memo[n] = count
	return count
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		total += f(n)
	}

	fmt.Printf("total=%d\n", total)
}
