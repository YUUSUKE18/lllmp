package main

import (
	"bufio"
	"fmt"
	"os"
)

var memo map[int]int

func collatzStep(n int) int {
	if n == 1 {
		return 0
	}
	
	val, ok := memo[n]
	if ok {
		return val
	}
	
	var steps int
	if n%2 == 0 {
		steps = 1 + collatzStep(n/2)
	} else {
		steps = 1 + collatzStep(3*n+1)
	}
	
	memo[n] = steps
	return steps
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	total := 0
	
	for scanner.Scan() {
		line := scanner.Text()
		
		// 空行や整数として解釈できない行は無視
		if line == "" {
			continue
		}
		
		var n int64
		_, err := fmt.Sscanf(line, "%d", &n)
		if err != nil {
			continue
		}
		
		if n <= 0 {
			continue
		}
		
		steps := collatzStep(int(n))
		total += steps
	}
	
	fmt.Printf("total=%d\n", total)
}
