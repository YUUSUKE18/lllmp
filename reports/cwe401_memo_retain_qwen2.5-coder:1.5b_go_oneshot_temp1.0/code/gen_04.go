package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)
	for sc.Scan() {
		if strings.TrimSpace(sc.Text()) == "" {
			continue
		}
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
			continue
		}
		if result, ok := memo[n]; ok {
			total += result
			continue
		}
		if n%2 == 0 {
			total += 1 + memo[n/2]
		} else {
			total += 1 + memo[3*n+1]
		}
		memo[n] = total
	}
	fmt.Printf("total=%d\n", total)
}
