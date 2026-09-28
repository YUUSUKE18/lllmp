package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int64]int64)

func collatzStep(n int64) int64 {
	if v, ok := memo[n]; ok {
		return v
	}
	step := 0
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3*n + 1
		}
		step++
	}
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
		parts := []int64{}
		for _, s := range []byte(line) {
			if s >= '0' && s <= '9' {
				digit := int64(s - '0')
				parts = append(parts, parts[len(parts)-1]*10+digit)
			} else {
				break
			}
		}
		if len(parts) == 0 {
			continue
		}
		n := int64(parts[0])
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
