package main

import (
	"bufio"
	"fmt"
)

var memo = make(map[int]int)

func solve(n int) int {
	if memo[n] != 0 {
		return memo[n]
	}

	if n == 1 {
		return 0
	}

	if n%2 == 0 {
		next := n / 2
	} else {
		next := 3 * n + 1
	}

	result := 1 + solve(next)

	memo[n] = result
	return result
}

func main() {
	var reader bufio.Reader
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			if err == io.EOF {
				break
			}
			continue
		}
		if line == "" {
			continue
		}
		// 1〜32-bit 整数を処理
		val, err := strconv.ParseInt(line, 10, 32)
		if err != nil {
			continue
		}

		handsh = solve(val)
		// 2nd line: total
		fmt.Println("total=", handsh)
	}

}
