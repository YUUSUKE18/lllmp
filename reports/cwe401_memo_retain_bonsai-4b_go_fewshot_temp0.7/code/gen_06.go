package main

import (
	"bufio"
	"fmt"
	"os"
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
		result := n / 2
	} else {
		result := 3*n + 1
	}
	memo[n] = result
	for i := result; i > 1; i += 2 {
		if i%2 == 0 {
			result := i / 2
		} else {
			result := 3*i + 1
		}
	}
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total = 0
	for {
		n, err := sc.Read('\n')
		if err != nil {
			break
		}
		if err != nil {
			continue
		}
		n = strconv.Atoi(sc.Text().Trim())
		if n <= 0 {
			continue
		}
		// 1 から n/2 までを繰り返す
		// 複数のクエリが同じnを含む場合も処理
		// 1 が1ならhand数は0
		// 1は0
		result := solve(n)
		total += result
	}
	fmt.Printf("total=%d\n", total)
}
