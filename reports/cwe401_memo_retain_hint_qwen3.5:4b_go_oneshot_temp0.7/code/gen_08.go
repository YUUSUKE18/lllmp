package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

var memo = make(map[int]int64)

func steps(n int64, max int64) int64 {
	if n == 1 {
		return 0
	}
	
	key := int(n)
	if val, ok := memo[key]; ok {
		return val
	}
	
	steps := int64(0)
	if n % 2 == 0 {
		next := n / 2
		steps = 1 + steps(next, max)
	} else {
		next := 3*n + 1
		steps = 1 + steps(next, max)
	}
	
	memo[key] = steps
	return steps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	maxInt := int64(9223372036854775807) // 64bit signed int max
	
	var total int64
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil || n <= 0 {
			continue
		}
		
		total += steps(n, maxInt)
	}
	
	fmt.Printf("total=%d\n", total)
}
