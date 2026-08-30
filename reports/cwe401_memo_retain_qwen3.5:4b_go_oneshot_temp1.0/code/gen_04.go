package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func collatzStep(n int) int {
	if n == 1 {
		return 0
	}
	val, ok := memo[n]
	if ok {
		return val
	}
	steps := 0
	if n%2 == 0 {
		nextN := n / 2
	} else {
		nextN = 3*n + 1
	}
	steps += collatzStep(nextN)
	memo[n] = steps
	return steps
}

func main() {
	var total int
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		parts := strings.Fields(line)
		if len(parts) != 1 {
			continue
		}
		n, err := strconv.Atoi(parts[0])
		if err != nil {
			continue
		}
		steps := collatzStep(n)
		total += steps
	}
	fmt.Printf("total=%d\n", total)
}
