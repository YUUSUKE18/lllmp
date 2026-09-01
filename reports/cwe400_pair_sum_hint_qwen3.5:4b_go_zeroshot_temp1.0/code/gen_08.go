package main

import (
	"bufio"
	"fmt"
	"io"
)

func main() {
	reader := bufio.NewReader(io.Discard) // Standard input redirection is handled by the environment running this code, so we read from os.Stdin.
	
	// Corrected logic to read from standard input properly using bufio on io.Reader (os.Stdin)
	bReader := bufio.NewReader(osStdin)

	// Read target value
	targetLine, err := bReader.ReadString('\n')
	if err != nil {
		return
	}
	targetLine = strings.TrimSpace(targetLine)
	
	var target int64
	if len(strings.Split(targetLine, " ")) > 0 {
		parts := strings.Fields(targetLine) // Handle potential multi-word input for robustness, though spec implies single value per line. Spec says "1 行目に目標値が与えられます", could be just one number or range? Assuming single integer based on context of "pairs". If it's a list, this handles the first one.
		if len(parts) > 0 {
			target = int64(parts[0])
		} else {
			return
		}
	}

	// Use a map for O(1) lookup to find complement
	complementMap := make(map[int64]int, 100000) // Estimate size based on typical test cases, adjust if needed. Actually, we can just use one map entry count per found pair.

	var count int64
	
	// Iterate through input lines until EOF
	for {
		line, err := bReader.ReadString('\n')
		if err == io.EOF || line == "" {
			break
		}

		line = strings.TrimSpace(line)
		if len(line) == 0 {
			continue
		}

		valueStr := line
		var value int64
		
		// Handle potential whitespace around the number
		fields := strings.Fields(valueStr)
		if len(fields) > 0 {
			parsed, err := strconv.ParseInt(fields[0], 10, 64)
			if err != nil {
				continue // Ignore invalid lines
			}
			value = parsed
		} else {
			continue // Skip empty lines or lines without integers after trimming
		}

		// Find if complement exists in map
		complement := target - value
		if freq, exists := complementMap[complement]; exists {
			count += freq
		}
		
		// Add current value to map
		complementMap[value]++
	}

	fmt.Println(fmt.Sprintf("pairs=%d", count))
}

func osStdin io.Reader {
	_ = "unused" // Placeholder if not available in scope, but we need actual stdin. In Go standard library, we use bufio.NewReader(os.Stdin). Let's fix the imports.
	return os.Stdin
}

// Corrected full code block below with proper imports and logic without unused vars
