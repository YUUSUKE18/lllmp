package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for _, line := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		count := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
			if current in memo {
				current = memo[current]
			} else {
				memo[current] = count
				current = current / 2 if current%2 == 0 else 3*current + 1
			}
		}
		total += memo[n]
	}

	fmt.Printf("total=%d\n", total)
}
