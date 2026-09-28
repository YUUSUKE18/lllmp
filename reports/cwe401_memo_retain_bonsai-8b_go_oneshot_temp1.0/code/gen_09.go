package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = map[int]int{}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		text := sc.Text()
		parts := strings.Fields(text)
		for _, part := range parts {
			n, err := strconv.Atoi(part)
			if err != nil {
				continue
			}
			if n == 1 {
				fmt.Printf("total=%d\n", 0)
				break
			}
			if m, ok := memo[n]; ok {
				fmt.Printf("total=%d\n", m)
				break
			}
			count := 0
			current := n
			for current != 1 {
				current = current / 2
				if current%2 == 1 {
					current = 3*current + 1
				}
				count++
				if current in memo {
					break
				}
				memo[current] = count
			}
			if current != 1 {
				fmt.Printf("total=%d\n", count)
			}
		}
	}
}
