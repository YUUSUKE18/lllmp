package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int64)
	total := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		cost := memo[n]
		if cost == 0 {
			if n == 1 {
				cost = 0
			} else if n%2 == 0 {
				cost = 1 + memo[n/2]
			} else {
				val := int64(3*n+1)
				if val < 0 {
					continue
				}
				cost = 1 + memo[val]
			}
		}

		total += cost
		memo[n] = cost
	}

	fmt.Printf("total=%d\n", total)
}
