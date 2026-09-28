package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int)

func solve(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != nil {
		return memo[n]
	}
	if n%2 == 0 {
		result := solve(n / 2)
	} else {
		result := solve(3*n + 1)
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
			if line == "1" {
				break
			}
		}
		if line == "" {
			break
		}
		// 1 以上の整数を分割して読み取る
		nums := strings.Fields(line)
		for _, s := range nums {
			if s == "" {
				continue
			}
			n, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			if n == 1 {
				continue
			}
			result := solve(n)
			total += result
		}
	}
	fmt.Printf("total=%d\n", total)
}
