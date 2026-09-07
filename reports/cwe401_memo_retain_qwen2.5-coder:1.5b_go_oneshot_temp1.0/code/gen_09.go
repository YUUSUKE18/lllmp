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
	for _, f := range strings.Fields(sc.Text()) {
		if len(f) == 0 {
			continue
		}
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if _, ok := memo[n]; ok {
			fmt.Printf("total=%d\n", memo[n])
			continue
		}
		step := 0
		for n != 1 {
			memo[n] = step
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			step++
		}
		total += step
		fmt.Printf("total=%d\n", total)
	}
}
