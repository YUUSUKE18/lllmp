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
	max := 0
	first := true
	memo := make(map[int]int)
	total := 0
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > max {
			max = n
			first = false
		}
		if n == 1 {
			total += 0
		} else if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		if memo[n] == 0 {
			memo[n] = total + 1
		}
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
