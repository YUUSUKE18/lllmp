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
	memo := make(map[int]int)
	var total int
	for sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			total++
			continue
		}
		if n == memo[n] {
			continue
		}
		memo[n] = total
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		total++
	}
	fmt.Printf("total=%d\n", total)
}
