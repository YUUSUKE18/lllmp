package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func calc(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != nil {
		return memo[n]
	}
	if n%2 == 0 {
		result := calc(n / 2)
	} else {
		result := calc(3*n + 1)
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var total 0
	for {
		line := ""
		for {
			line += fmt.Scanf(sc, "%d", &line)
			if line == "" {
				break
			}
		}
		if line == "" {
			break
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n < 1 {
			continue
		}
		total += calc(n)
	}
	fmt.Printf("total=%d\n", total)
}
