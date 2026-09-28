package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"runtime"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		sc.Scan()
		if sc.Err() {
			break
		}
		text := sc.Text()
		if len(text) == 0 {
			continue
		}
		if !strings.Contains(text, "") {
			continue
		}
		for i := 0; i < len(text); i++ {
			if strings.ContainsN(text, "\n", i) {
				break
			}
			if !strings.Contains(text, text[i:]) {
				continue
			}
			line := text[i:]
			if len(line) == 0 {
				continue
			}
			n, err := strconv.Atoi(line)
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
				if current%2 == 0 {
					current /= 2
				} else {
					current = 3*current + 1
				}
				count++
				memo[current] = count
			}
			total += count
		}
	}

	fmt.Printf("total=%d\n", total)
}
