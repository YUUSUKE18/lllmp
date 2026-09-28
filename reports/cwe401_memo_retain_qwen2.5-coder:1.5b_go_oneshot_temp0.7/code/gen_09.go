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
	for sc.Scan() {
		line := sc.Text()
		if len(line) == 0 {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if memo[n] != 0 {
			fmt.Printf("total=%d\n", memo[n])
			continue
		}
		if n == 1 {
			memo[n] = 0
			total += memo[n]
			continue
		}
		if n%2 == 0 {
			memo[n] = memo[n/2] + 1
			total += memo[n]
		} else {
			memo[n] = memo[3*n+1] + 1
			total += memo[n]
		}
	}
	fmt.Printf("total=%d\n", total)
}
