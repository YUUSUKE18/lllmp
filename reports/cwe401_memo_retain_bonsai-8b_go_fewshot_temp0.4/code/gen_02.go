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
	sc.Scan()
	memo := make(map[int]int)
	total := 0
	for {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			sc.Scan()
			continue
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if n in memo {
			fmt.Printf("total=%d\n", total)
			return
		}
		memo[n] = 1 + memo[n/2] if n%2 == 0 else 1 + memo[3*n+1]
		total += memo[n]
		sc.Scan()
	}
	fmt.Printf("total=%d\n", total)
}
