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
	sc.Scan()
	memo := make(map[int]int)
	total := 0

	for {
		n, err := sc.ReadInt()
		if err != nil {
			break
		}
		if n == 1 {
			total += 0
			continue
		}
		if n in memo {
			total += memo[n]
			continue
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
				break
			}
			memo[current] = count
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
