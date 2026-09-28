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
		nStr := nStr[0]
		n, err := strconv.Atoi(nStr)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=0\n")
			continue
		}
		if memo[n] != 0 {
			fmt.Printf("total=%d\n", memo[n])
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
		}
		memo[n] = count
		fmt.Printf("total=%d\n", total)
		total += count
	}
}
