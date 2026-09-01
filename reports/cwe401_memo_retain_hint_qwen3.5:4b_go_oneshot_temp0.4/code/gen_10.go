package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int64)

func collatzStep(n int64) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return int(val)
	}
	step := 0
	if n%2 == 0 {
		n = n / 2
	} else {
		n = 3*n + 1
	}
	step += 1 + collatzStep(n)
	memo[n] = int64(step)
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
		parts := []int64{}
		for _, f := range []byte(line) {
			if f >= '0' && f <= '9' {
				digit := int64(f - '0')
				parts = append(parts, digit)
			} else {
				break
			}
		}
		if len(parts) == 0 {
			continue
		}
		var n int64
		for _, d := range parts {
			n = n*10 + d
		}
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
