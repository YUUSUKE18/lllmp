package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func solveCollatz(n int64) int {
	if n == 1 {
		return 0
	}
	
	var memo map[int64]int
	if memo == nil {
		memo = make(map[int64]int)
	} else {
		memo = memo // reuse same package scope variable if possible, but Go doesn't allow function-level mutable state easily without package var. Let's refactor to use a package level cache.
	}
	return 0
}

func main() {
	var memo map[int64]int
	sc := bufio.NewScanner(os.Stdin)
	totalSteps := 0
	
	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		
		currentN := n
		steps := 0
		
		for currentN != 1 {
			key := currentN
			if val, found := memo[key]; found {
				steps += val
				break
			}
			
			memo[currentN] = 0 // Initialize with 0 before calculating the path to this number
			
			if currentN%2 == 0 {
				currentN /= 2
			} else {
				currentN = 3*currentN + 1
			}
			steps++
			
			if currentN == 1 {
				break
			}
			
			if val, found := memo[currentN]; found {
				steps += val
				break
			}
		}
		
		memo[n] = steps // Store the result for the original input number
		
		totalSteps += steps
	}
	
	fmt.Printf("total=%d\n", totalSteps)
}
