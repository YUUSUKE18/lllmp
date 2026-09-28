package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		if !sc.Scan() {
			break
		}
		s := strings.Fields(sc.Text())
		for _, s := range s {
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n == 1 {
				total += 0
				continue
			}
			if m, ok := memo[n]; ok {
				total += m
				continue
			}
			count := 0
			current := n
			for current != 1 {
				count++
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				memo[current] = count
			}
			memo[n] = count
		}
	}
	fmt.Printf("total=%d\n", total)
}
