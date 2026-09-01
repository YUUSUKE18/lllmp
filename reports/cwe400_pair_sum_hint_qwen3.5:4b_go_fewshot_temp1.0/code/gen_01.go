package main

import (
	"bufio"
	"fmt"
)

func main() {
	r := bufio.NewScanner(scanner := bufio.NewScanner(os.Stdin)) // Fixed: use variable name
	buf := make([]byte, 64*1024) // Buffer for reading lines

	// Read the first line (target value)
	if !scanner.Scan() {
		fmt.Println("error")
		return
	}

	var target int64
	if _, err := fmt.Sscanf(scanner.Text(), "%d", &target); err != nil {
		fmt.Println("error")
		return
	}

	sums := map[int64]int{} // Map to store frequency of sums seen so far
	totalPairs := 0

	// Read subsequent lines
	for scanner.Scan() {
		line := scanner.Text()
		
		// Skip empty lines or lines that don't contain a valid integer
		if line == "" {
			continue
		}

		var val int64
		if _, err := fmt.Sscanf(line, "%d", &val); err != nil {
			continue
		}

		complement := target - val
		
		// If we have seen the complement before, add the frequency to total pairs
		if sum, exists := sums[complement]; exists {
			totalPairs += sum
		}

		// Add current value to the map (increment its count)
		sums[val]++
	}

	// Print the result
	fmt.Printf("pairs=%d\n", totalPairs)
}
