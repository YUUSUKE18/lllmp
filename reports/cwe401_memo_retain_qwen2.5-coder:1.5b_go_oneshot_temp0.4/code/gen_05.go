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
	total := 0
	memo := make(map[int]int)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if _, ok := memo[n]; ok {
			continue
		}
		if n == 1 {
			memo[n] = 0
		} else if n%2 == 0 {
			memo[n] = memo[n/2] + 1
		} else {
			memo[n] = memo[3*n+1] + 1
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
