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
		if _, exists := memo[n]; exists {
			fmt.Printf("total=%d\n", total)
			return
		}
		memo[n] = 0
		for {
			n = n % 2 == 0 ? n / 2 : 3*n + 1
			if n == 1 {
				memo[n] = 1
				break
			}
		}
		total += memo[n]
		sc.Scan()
	}
	fmt.Printf("total=%d\n", total)
}
