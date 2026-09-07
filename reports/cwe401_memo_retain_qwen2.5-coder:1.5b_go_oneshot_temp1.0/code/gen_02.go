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
	total := 0
	memo := make(map[int]int)

	for {
		line, err := sc.Scan()
		if err == io.EOF {
			break
		}
		if len(line) == 0 {
			continue
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		if memo[n] != 0 {
			total += memo[n]
			continue
		}

		memo[n] = compute(n)
		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}

func compute(n int) int {
	count := 0
	for n != 1 {
		count++
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
	}
	return count
}
