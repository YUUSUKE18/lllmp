package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memo stores the step count for each number encountered.
// Key: int64, Value: int (step count to reach 1).
var memo = make(map[int64]int)

func steps(n int64) int {
	if n == 1 {
		return 0
	}
	
	// If we have already computed the steps for this number, return it.
	if val, ok := memo[n]; ok {
		return val
	}
	
	var totalSteps int
	// Calculate next value and handle potential overflow by using int64 arithmetic.
	// The problem guarantees values fit in 64-bit integer range.
	nextVal := n
	if n%2 == 0 {
		nextVal = n / 2
	} else {
		nextVal = 3*n + 1
	}
	
	totalSteps = 1 + steps(nextVal)
	
	// Memoize the result (store as int64 key to match input type logic, though we use int value).
	memo[n] = totalSteps
	
	return totalSteps
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	totalSum := 0
	
	for sc.Scan() {
		line := sc.Text()
		
		// Skip empty lines.
		if len(line) == 0 {
			continue
		}
		
		// Try to parse the integer from the line.
		// We use strconv.ParseInt with Int64 flag to handle 64-bit integers.
		// We also trim whitespace.
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Ignore lines that cannot be interpreted as integers.
		}
		
		stepCount := steps(n)
		totalSum += stepCount
	}
	
	fmt.Printf("total=%d\n", totalSum)
}
