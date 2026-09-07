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
		if n == 1 {
			fmt.Printf("total=%d\n", 0)
			continue
		}
		if memo[n] != 0 {
			fmt.Printf("total=%d\n", memo[n])
			continue
		}
		count := 0
		for n != 1 {
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			count++
		}
		fmt.Printf("total=%d\n", count)
		memo[n] = count
	}
}
