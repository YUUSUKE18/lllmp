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
		if !strings.TrimSpace(sc.Text()) {
			continue
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if memo[n] != 0 {
			fmt.Printf("total=%d\n", total)
			return
		}
		memo[n] = 1 + memo[n/2] if n%2 == 0 else 1 + memo[3*n+1]
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
