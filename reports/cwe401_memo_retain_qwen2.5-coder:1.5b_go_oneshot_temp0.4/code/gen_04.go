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
	sc.Scan()
	max := 0
	first := true
	memo := make(map[int]int)
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > max {
			max = n
			first = false
		}
		if memo[n] == 0 {
			memo[n] = calculateSteps(n)
		}
		fmt.Printf("total=%d\n", memo[n])
	}
}

func calculateSteps(n int) int {
	if n == 1 {
		return 0
	}
	if n%2 == 0 {
		return 1 + calculateSteps(n / 2)
	}
	return 1 + calculateSteps(3*n + 1)
}
