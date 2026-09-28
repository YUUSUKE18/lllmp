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
		result := solve(n/2)
	} else {
		result := solve(3*n + 1)
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total 0
	for {
		line, err := sc.Scan()
		if err != nil {
			break
		}
		if strings.TrimSpace(line) == "" {
			continue
		}
		// 1 以上の整数を1分に読み取る
		values := []int{}
		for _, v := range line.Split(",")
		// 1 以上の整数を1分に読み取る
		if v != "" {
			val, err := strconv.Atoi(v)
			if err != nil {
				continue
			}
			if val > 0 {
				values = append(values, val)
			}
		}
		// チェック：空行または空文字は無視
		if len(values) == 0 {
			continue
		}
		for _, v := range values {
			if v > 0 {
				total += solve(v)
			}
		}
	}
	fmt.Printf("total=%d\n", total)
}
