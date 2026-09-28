package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo = make(map[int]int64)

func steps(n int) int64 {
	if n == 1 {
		return 0
	}
	
	if v, ok := memo[n]; ok {
		return v
	}
	
	stepsCount := steps(3*n+1) + 1
	memo[n] = stepsCount
	return stepsCount
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	total := int64(0)
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		
		var n int64
		fmt.Sscanf(line, "%d", &n)
		if n >= 1 {
			total += steps(int(n))
		}
	}
	
	fmt.Printf("total=%d\n", total)
}
