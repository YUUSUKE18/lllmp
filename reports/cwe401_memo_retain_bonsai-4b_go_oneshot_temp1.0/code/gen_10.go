package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = map[int]int{}
var total = 0

func solve(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}
	if n == 1 {
		result := 0
		return result
	}
	if n%2 == 0 {
		next := n / 2
	} else {
		next := 3*n + 1
	}
	result := 1 + solve(next)
	memo[n] = result
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	for {
		line := ""
		for line = "", line = scanner.Scan(); line != "" {
			if line == "" {
				continue
			}
			// クエリの整数を読み取り
			line = strings.TrimSpace(line)
			if line == "" {
				continue
			}
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			if n <= 0 {
				continue
			}
			// 手数を計算
			result := solve(n)
			total += result
		}
		if scanner.Done() {
			break
		}
	}
	fmt.Printf("total=%d\n", total)
}
