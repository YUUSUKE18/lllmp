package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	memo := make(map[int]int)
	for _, q := range strings.Split(sc.Text(), "\n") {
		if q == "" {
			continue
		}
		n, err := strconv.Atoi(q)
		if err != nil {
			continue
		}
		if memo[n] != 0 {
			total += memo[n]
			continue
		}
		if n == 1 {
			memo[n] = 0
		} else if n%2 == 0 {
			memo[n] = 1 + memo[n/2]
		} else {
			memo[n] = 1 + memo[3*n+1]
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
