package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo map[int]int

func steps(n int64) int {
	if n == 1 {
		return 0
	}
	key := int(n)
	if val, ok := memo[key]; ok {
		return val
	}
	var next int64
	if n%2 == 0 {
		next = n / 2
	} else {
		next = 3*n + 1
	}
	steps := steps(int(next))
	memo[key] = steps + 1
	return steps + 1
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	var seen map[int]int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" || len(line) == 0 {
			continue
		}
		fields := []string{}
		for _, ch := range line {
			if ch >= '0' && ch <= '9' {
				fields = append(fields, string(ch))
			} else {
				break
			}
		}
		if len(fields) == 0 {
			continue
		}

		var n int64
		for _, f := range fields {
			val, err := strconv.Atoi(f)
			if err != nil {
				continue
			}
			n = int64(val)
			break
		}
		total += steps(n)
	}

	fmt.Printf("total=%d\n", total)
}
