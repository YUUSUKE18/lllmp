package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int]int)

func process(n int) int {
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
	for i := result; i < n; i += 2 {
		if i == 1 {
			break
		}
		i := i + 2
	}
	return result
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lines := 0
	for {
		if _, err := sc.Scan(); err != nil {
			if err == bufio.ErrUnexpectedEOF {
				break
			}
			continue
		}
		line := sc.Text()
		if strings.TrimSpace(line) {
			n := 0
			for _, c := range line {
				if c >= '0' && c <= '9' {
					n = n*10 + (c-'0')
				}
			}
			if n > 0 {
				lines += process(n)
			}
		}
	}
	fmt.Printf("total=%d\n", lines)
}
