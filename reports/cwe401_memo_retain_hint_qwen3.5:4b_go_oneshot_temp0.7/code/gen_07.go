package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// memo stores the number of steps for each input value.
// Key is int64, Value is int64 representing steps.
var memo = make(map[int64]int64)

func steps(n int64) int64 {
	if n == 1 {
		return 0
	}
	
	// Check cache first
	if val, ok := memo[n]; ok {
		return val
	}

	var s int64 = 0
	
	// Collatz sequence simulation
	for n != 1 {
		s++
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
	}

	memo[n] = s + steps(n)
	return s
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var total int64
	
	for sc.Scan() {
		line := sc.Text()
		
		// Skip empty lines or lines that cannot be parsed as integers
		if line == "" {
			continue
		}
		
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		
		total += steps(int64(n))
	}

	fmt.Printf("total=%d\n", total)
}
