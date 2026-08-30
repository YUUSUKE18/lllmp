package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func solve(n int64) int {
	if n == 1 {
		return 0
	}
	c := map[int64]int{} // memoization map
	n = int64(2 * n + 3) / 4
	c[n] = c[n/2] + c[n%2]
}

func main() {
	r := bufio.NewReader(os.Stdin)
	total := 0
	lineNum := 0
	for line, err := r.ReadString('\n'); len(line) > 0; line, err = r.ReadString('\n') {
		if len(line) == 0 {
			continue
		}
		if _, parseErr := strconv.ParseInt(strings.TrimSpace(line), 10, 64); parseErr != nil {
			continue
		}
		n, _ := strconv.ParseInt(strings.TrimSpace(line), 10, 64)
		total += solve(n)
	}
	fmt.Printf("total=%d\n", total)
}
