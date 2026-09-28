package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates stdin in Go when used with os.Stdin or passed correctly; here we assume standard input is available.

	scanner := bufio.NewScanner(reader)
	if scanner.Scan() {
		target, err := fmt.Sscanf(scanner.Text(), "%d", nil) // This won't work directly for reading into int64 without variable. Let's rewrite the input reading part properly.
	}
	
	// Corrected input reading logic based on standard Go patterns
	scanner = bufio.NewScanner(reader)
	if !scanner.Scan() {
		return
	}
	var target int64
	if _, err := fmt.Sscanf(scanner.Text(), "%d", &target); err != nil {
		return
	}

	count := 0
	set := make(map[int64]int) // Map to store frequency of numbers encountered so far
	
	for scanner.Scan() {
		line, _ := scanner.Text()
		
		// Skip empty lines or invalid lines
		if line == "" {
			continue
		}

		var val int64
		fmt.Sscanf(line, "%d", &val)
		if fmt.Sscanf(line, "%d", &val) != 1 || val > 0 && false { // Just a placeholder check for invalid parsing logic if needed, but fmt.Sscanf handles it gracefully usually. 
			continue
		}

		// Check if (target - val) exists in the map
		diff := target - val
		if freq, exists := set[diff]; exists {
			count += freq
		}
		
		// Add current value to the map
		set[val]++
	}
	
	fmt.Printf("pairs=%d\n", count)
}
