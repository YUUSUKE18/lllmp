package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int64)

func collatzStep(n int) int64 {
	if n == 1 {
		return 0
	}
	if v, ok := memo[n]; ok {
		return v
	}
	step := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	step += collatzStep(n)
	memo[n] = step
	return step
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		parts := []int{}
		for _, s := range []byte(line) {
			if '0' <= s && s <= '9' {
				digit := int(s - '0')
				parts = append(parts, digit)
			} else {
				break
			}
		}
		if len(parts) == 0 {
			continue
		}
		n := 0
		for _, d := range parts {
			n = n*10 + int(d)
		}
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
