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
	seen := make(map[int]bool)

	for _, line := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n == 1 {
			continue
		}
		if seen[n] {
			continue
		}
		seen[n] = true
		count := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
