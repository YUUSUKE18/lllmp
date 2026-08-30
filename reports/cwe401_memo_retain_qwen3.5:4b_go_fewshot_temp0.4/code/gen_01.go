package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	memo := make(map[int64]int)
	total := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		parts := []int64{}
		for _, c := range line {
			if '0' <= c && c <= '9' {
				parts = append(parts, int64(c-'0'))
			} else if c == '-' {
				// 負の数をサポートする処理が必要だが、問題文は「1 以上の整数」とあるので省略。
				// ただし、入力形式が厳密でない場合を想定し、文字列として解析する必要がある。
				break
			}
		}

		if len(parts) == 0 {
			continue
		}

		n := int64(0)
		for i, c := range parts {
			if i > 0 && parts[i-1] != '-' {
				n = n * 10 + int64(c)
			} else if i == 0 && c == '0' {
				continue
			}
		}

		if n < 0 || n == 0 {
			continue
		}

		count := memo[n]
		if count == 0 {
			step := 0
			curr := n
			for curr != 1 {
				if curr%2 == 0 {
					curr = curr / 2
				} else {
					curr = 3*curr + 1
				}
				step++
			}
			memo[n] = step
			count = step
		}

		total += count
	}

	fmt.Printf("total=%d\n", total)
}
