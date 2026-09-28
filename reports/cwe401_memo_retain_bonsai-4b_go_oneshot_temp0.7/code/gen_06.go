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

func calc(n int) int {
	if n == 1 {
		return 0
	}
	if memo[n] != 0 {
		return memo[n]
	}
	if n%2 == 0 {
		result := calc(n / 2)
	} else {
		result := 3*n + 1
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	for {
		line := ""
		for line := range sc.Text() {
			if line == "" {
				break
			}
			line = line + strings.Fields([]byte(line))
		}
		if line == "" {
			break
		}
		for _, s := range line {
			if s == ' ' {
				continue
			}
			if s == '\n' {
				break
			}
		}
		// クエリは空格で分岐
		// 1 は特殊
		nums := strings.Fields([]byte(line))
		for _, numStr := range nums {
			if numStr == "" {
				continue
			}
			n, err := strconv.Atoi(numStr)
			if err != nil {
				continue
			}
			if n == 1 {
				continue
			}
			if memo[n] == 0 {
				// メモ化されていない場合は計算
				memo[n] = calc(n)
			}
			total += memo[n]
		}
	}
	fmt.Printf("total=%d\n", total)
}
