package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)
var total = 0

func solve(n int) int {
	if memo[n] != nil {
		return memo[n]
	}
	if n == 1 {
		memo[1] = 0
		return 0
	}
	if n%2 == 0 {
		result := solve(n / 2)
		if memo[n/2] != nil {
			memo[n] = memo[n/2] + 1
		} else {
			memo[n] = 1 + solve(n / 2)
		}
	} else {
		result := solve(3*n + 1)
		if memo[3*n + 1] != nil {
			memo[3*n + 1] = memo[3*n + 1] + 1
		} else {
			memo[3*n + 1] = 1 + solve(3*n + 1)
		}
	}
	memo[n] = result + 1
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	for _, line := range sc.Text() {
		// 空行をスキップする
		if strings.TrimSpace(line) == "" {
			continue
		}
		// 1〜32-bit整数の範囲で解析できるように制限
		// ただし、問題では64bit整数範囲でも収まります
		if strings.Contains(line, "0x") {
			// 0x1234 などは16进数ではなく、1〜32bitで解釈できる
			// しかし、問題では64bit整数の範囲で収まります
			// ここで、16进数の処理は可能だが、問題文は64bit
			n, err := strconv.ParseInt(line, 10, 64)
			if err == nil {
				total += solve(n)
			}
		} else {
			// 1〜32bitで可解析
			n, err := strconv.ParseInt(line, 10, 64)
			if err == nil {
				total += solve(n)
			}
		}
	}
	fmt.Printf("total=%d\n", total)
}
