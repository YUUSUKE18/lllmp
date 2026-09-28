```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := 0
	memo := make(map[int]int)

	for {
		sc.Scan()
		if err := strconv.Atoi(sc.Text()); err == nil {
			n := int(sc.Text())
			if n == 1 {
				total += 0
				continue
			}
			if m, exists := memo[n]; exists {
				total += m
				continue
			}
			memo[n] = 1 + solve(n)
			total += memo[n]
		}
	}

	// solve(n)は再帰的な関数で、nが1に到達するまでの手数を返します
	// ここではその関数を定義します
	// (Goの標準ライブラリのみを使用し、メモ化を含める)
	func solve(n int) int {
		if n == 1 {
			return 0
		}
		if m, exists := memo[n]; exists {
			return m
		}
		if n%2 == 0 {
			next := n / 2
		} else {
			next := 3*n + 1
		}
		m := solve(next)
		memo[n] = m + 1
		return m
	}
}
