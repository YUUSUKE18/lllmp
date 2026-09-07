package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	memo := make(map[int]int)
	for _, q := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(q)
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
		} else if n%2 == 0 {
			total += memo[n/2] + 1
		} else {
			total += memo[3*n+1] + 1
		}
		memo[n] = total
	}
	fmt.Printf("total=%d\n", total)
}
