package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
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

		if memo[n] > 0 {
			total += memo[n]
			continue
		}

		steps := 0
		curr := int64(n)
		for curr != 1 {
			if curr%2 == 0 {
				curr /= 2
			} else {
				curr = 3*curr + 1
			}
			steps++
		}

		memo[n] = steps
		total += steps
	}

	fmt.Printf("total=%d\n", total)
}
