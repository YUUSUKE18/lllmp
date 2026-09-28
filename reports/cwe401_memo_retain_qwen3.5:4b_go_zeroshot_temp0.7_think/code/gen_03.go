package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int64]int)

func solve(n int64) int {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}

	var res int
	if n%2 == 0 {
		res = solve(n / 2) + 1
	} else {
		res = solve(3*n + 1) + 1
	}

	memo[n] = res
	return res
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	var total int64

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		steps := solve(n)
		total += int64(steps)
	}

	fmt.Printf("total=%d\n", total)
}
