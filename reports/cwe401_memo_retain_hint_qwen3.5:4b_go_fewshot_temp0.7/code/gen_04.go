package main

import (
	"bufio"
	"fmt"
	"os"
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
	var total int64
	sc := bufio.NewScanner(os.Stdin)
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		total += collatzStep(n)
	}
	fmt.Printf("total=%d\n", total)
}
