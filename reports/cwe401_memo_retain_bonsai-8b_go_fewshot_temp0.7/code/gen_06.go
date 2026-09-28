package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"container/map"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int]int)
	total := 0

	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		n, _ = strconv.Atoi(n)
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if memo[n] != 0 {
			continue
		}
		operations := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			operations++
		}
		total += operations
		memo[n] = operations
	}

	fmt.Printf("total=%d\n", total)
}
