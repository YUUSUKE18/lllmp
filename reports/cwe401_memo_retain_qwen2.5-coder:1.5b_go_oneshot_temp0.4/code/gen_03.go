package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int]int)
	total := 0
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
			total += memo[n]
			continue
		}
		count := 0
		for n != 1 {
			memo[n] = count
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
		}
		memo[n] = count
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
