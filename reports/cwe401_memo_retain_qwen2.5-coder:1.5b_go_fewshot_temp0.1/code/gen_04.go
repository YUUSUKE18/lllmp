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
	for _, n := range strings.Fields(sc.Text()) {
		if n == "" {
			continue
		}
		i, err := strconv.Atoi(n)
		if err != nil {
			continue
		}
		if i == 1 {
			total += 0
		} else if memo[i] != 0 {
			total += memo[i]
		} else {
			memo[i] = 0
			if i%2 == 0 {
				memo[i] = memo[i/2] + 1
			} else {
				memo[i] = memo[3*i+1] + 1
			}
			total += memo[i]
		}
	}
	fmt.Printf("total=%d\n", total)
}
