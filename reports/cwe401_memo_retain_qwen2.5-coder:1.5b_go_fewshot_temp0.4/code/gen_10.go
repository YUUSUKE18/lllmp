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
	max := 0
	first := true
	memo := make(map[int]int)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > max {
			max = n
			first = false
		}
		if memo[n] > 0 {
			fmt.Printf("total=%d\n", memo[n])
			continue
		}
		if n == 1 {
			memo[n] = 0
			continue
		}
		if n%2 == 0 {
			memo[n] = memo[n/2] + 1
		} else {
			memo[n] = memo[3*n+1] + 1
		}
	}
	fmt.Printf("total=%d\n", memo[max])
}
