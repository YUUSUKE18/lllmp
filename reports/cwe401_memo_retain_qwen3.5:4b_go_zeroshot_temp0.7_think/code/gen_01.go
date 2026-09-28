package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int64]int)

func steps(n int64) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}
	nextN := n
	if n%2 == 0 {
		nextN = n / 2
	} else {
		nextN = 3*n + 1
	}
	res := steps(nextN)
	memo[n] = res + 1
	return res + 1
}

func main() {
	var total int64 = 0
	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		s := strings.TrimSpace(line)
		if s == "" {
			continue
		}
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		total += steps(n)
	}
	fmt.Printf("total=%d\n", total)
}
