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
			line += sc.Text()
			if line == "" {
				break
			}
			if _, err := strconv.Atoi(line); err == nil {
				break
			}
		}
		if line == "" {
			break
		}
		n := int(line)
		if n > 0 {
			total += calc(n)
		}
	}
	fmt.Printf("total=%d\n", total)
}
