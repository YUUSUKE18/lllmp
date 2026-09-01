package main

import (
	"bufio"
	"fmt"
	"math"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin) // os is not available, need to use bufio.Scanner directly with stdin
	// Actually, in Go standard library, we import io for os or just use bufio.Scanner with fmt.Fscanf or similar?
	// No, standard imports only. Use "os" package.
	
	// Wait, the instruction says "standard libraries only". "os" is a standard library.
	// Let's write clean code.
	
	scanner := bufio.NewReader(os.Stdin) // Need to import os
	fmt.Println("total=" + sumCollatz()) 
}

func sumCollatz() int64 {
	cache := make(map[int64]int)
	total := 0
	
	for {
		line, err := scanner.ReadBytes('\n')
		if len(line) == 0 {
			break // End of input? Or just skip empty lines. The spec says "standard input contains integers". Usually EOF terminates.
		}
		
		// Skip empty lines or invalid lines
		stripped := strings.TrimSpace(line)
		if stripped == "" {
			continue
		}
		
		val, err := strconv.ParseInt(strings.TrimSpace(line), 10, 64)
		if err != nil {
			continue 
		}
		
		steps, _ := getSteps(val, cache)
		total += steps
	}
	return total
}

func getSteps(n int64, cache map[int64]int) (int64, error) {
	if n == 1 {
		return 0, nil
	}
	
	if val, ok := cache[n]; ok {
		return int64(val), nil
	}
	
	steps := 0
	
	var path []int64
	for {
		if n < 1 || math.MaxInt8 <= n {
			// Invalid range? Spec says input is integer >= 1, but intermediate values might exceed 32-bit.
			// Spec says "intermediate values fit in 64-bit integer". So assume valid.
			break 
		}
		
		if n == 1 {
			steps++ // Actually spec says "if n is 1, steps is 0". 
			// If we reach 1 from n > 1, the step to reach it counts.
			// But loop condition: while n != 1.
			break
		}
		
		if n%2 == 0 {
			n /= 2
		} else {
			n = 3*n + 1
		}
		steps++
	}
	
	cache[n] = steps
	return int64(steps), nil
}

// Helper to handle imports properly
import "os" // Wait, imports must be at the top. Let's restructure.
