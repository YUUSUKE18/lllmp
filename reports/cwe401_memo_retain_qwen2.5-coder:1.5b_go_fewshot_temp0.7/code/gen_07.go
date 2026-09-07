package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	cache := make(map[int]int)
	total := 0
	for sc.Scan() {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			continue
		}
		if n == 1 {
			total += 0
			continue
		}
		if cache[n] == 0 {
			cache[n] = func(n int) int {
				if n%2 == 0 {
					return n / 2
				}
				return 3*n + 1
			}(n)
			total += cache[n]
		}
	}
	fmt.Printf("total=%d\n", total)
}
