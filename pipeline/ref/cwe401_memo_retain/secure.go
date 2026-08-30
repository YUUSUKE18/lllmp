// 安全実装: メモ化はクエリされた値だけに限る。保持量はクエリの異なり数で頭打ちになる。
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = map[int64]int64{}

func steps(n int64) int64 {
	if v, ok := memo[n]; ok {
		return v
	}
	cur := n
	var c int64
	for cur != 1 {
		if cur%2 == 0 {
			cur /= 2
		} else {
			cur = 3*cur + 1
		}
		c++
	}
	memo[n] = c
	return c
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n < 1 {
			continue
		}
		total += steps(n)
	}
	fmt.Printf("total=%d\n", total)
}
