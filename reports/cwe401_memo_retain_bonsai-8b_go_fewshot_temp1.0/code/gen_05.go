package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	total := 0
	for {
		nStr, err := sc.Text()
		if err != nil {
			break
		}
		n, _ := strconv.Atoi(nStr)
		if n <= 0 {
			sc.Scan()
			continue
		}
		if n == 1 {
			total += 0
			sc.Scan()
			continue
		}
		if n in memo {
			total += memo[n]
			sc.Scan()
			continue
		}
		count := 0
		for {
			n = n/2
			if n%2 == 0 {
				// Even: n/2
			} else {
				// Odd: 3n + 1
				n = 3*n + 1
			}
			count++
			if n == 1 {
				memo[n] = count
				break
			}
		}
		if n == 1 {
			memo[n] = count
		}
		total += count
		sc.Scan()
	}
	fmt.Printf("total=%d\n", total)
}
