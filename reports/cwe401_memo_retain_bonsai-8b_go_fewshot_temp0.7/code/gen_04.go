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
	sc.Scan()
	memo := make(map[int]int)
	total := 0
	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		if n == 1 {
			total += 0
			continue
		}
		n, _ := strconv.Atoi(n)
		if n < 0 {
			continue
		}
		if n in memo {
			total += memo[n]
			continue
		}
		count := 0
		for n > 1 {
			n = n%2 == 0 ? n/2 : 3*n + 1
			count++
		}
		memo[n] = count
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
