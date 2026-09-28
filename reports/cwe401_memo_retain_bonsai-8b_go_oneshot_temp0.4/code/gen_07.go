package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"map"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		sc.Scan()
		if sc.Err() {
			if err == bufio.ErrUnexpectedEOF {
				break
			}
			continue
		}
		if sc.Text() == "" {
			continue
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
			continue
		}
		if memo[n] != 0 {
			total += memo[n]
			continue
		}
		count := 0
		current := n
		for current != 1 {
			current = (current%2 == 0) ? current/2 : 3*current + 1
			count++
		}
		memo[n] = count
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
