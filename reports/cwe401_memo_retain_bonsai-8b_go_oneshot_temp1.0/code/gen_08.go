package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"container/map"
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
		nStr := strings.FieldsN(sc.Text(), 1)
		if len(nStr) == 0 {
			continue
		}
		nStr := strings.TrimSpace(nStr[0])
		n, err := strconv.Atoi(nStr)
		if err != nil {
			continue
		}
		if n <= 0 {
			continue
		}
		if n == 1 {
			fmt.Printf("total=%d\n", total)
			return
		}
		if m, ok := memo[n]; ok {
			fmt.Printf("total=%d\n", total)
			return
		}
		if n%2 == 0 {
			next := n / 2
		} else {
			next := 3*n + 1
		}
		memo[n] = 1 + memo[next]
		total += memo[n]
	}
	fmt.Printf("total=%d\n", total)
}
