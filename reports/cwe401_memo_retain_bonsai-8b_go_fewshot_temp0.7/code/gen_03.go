package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"map"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		n, err := sc.Scan()
		if err != nil {
			break
		}
		n, _ = strconv.Atoi(n)
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if _, ok := memo[n]; ok {
			fmt.Printf("total=%d\n", total)
			return
		}
		memo[n] = 1 + memo[n/2] if n%2 == 0 else 1 + memo[3*n+1]
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
