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
		if err := sc.Text(); err != nil {
			break
		}
		if nStr := strings.Fields(sc.Text()); len(nStr) == 0 {
			continue
		}

		nStr := strings.Fields(sc.Text())
		n := 0
		for _, s := range nStr {
			n, _ = strconv.Atoi(s)
		}

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
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
			memo[current] = count
		}
		memo[n] = count
		total += count
	}
}
