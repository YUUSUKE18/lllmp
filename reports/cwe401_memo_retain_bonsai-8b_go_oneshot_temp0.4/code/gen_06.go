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

	for {
		sc.Scan()
		if err := strconv.Atoi(sc.Text()); err == nil {
			n := int(sc.Text())
			if n == 1 {
				fmt.Printf("total=%d\n", total)
				return
			}
			if m, ok := memo[n]; ok {
				fmt.Printf("total=%d\n", total)
				return
			}
			count := 0
			current := n
			for current != 1 {
				if current%2 == 0 {
					current = current / 2
				} else {
					current = 3 * current + 1
				}
				count++
				memo[current] = count
			}
			total += count
		}
	}
}
