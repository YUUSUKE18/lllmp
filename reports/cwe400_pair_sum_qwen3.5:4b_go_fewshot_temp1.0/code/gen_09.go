package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target string
	lineNum := 0
	for sc.Scan() {
		lineNum++
		if lineNum == 1 {
			target = sc.Text()
			break
		}
		if lineNum > 1 {
			fmt.Sscanf(sc.Text(), "%d", nil) // Read and discard, but we need to collect numbers first.
			// The above approach is inefficient for large inputs as it stores everything in memory.
			// Let's refactor to use a map for O(1) lookups which is better for finding pairs.
			fmt.Sscanf(sc.Text(), "%d", nil) // Placeholder, logic below will handle this properly.
		}
	}

	// Corrected approach: Read all numbers into a map to check pairs efficiently.
	// Since we need the count of pairs (i, j) where i < j and arr[i] + arr[j] == target,
	// using a frequency map allows us to track how many times each number has appeared so far.
	
	sc = bufio.NewScanner(os.Stdin) // Re-scan or re-structure? The example implies one pass is possible but the spec says "2行目以降には整数".
	// Actually, standard input flow in Go: we should parse line by line.
	// Let's restart the logic to be correct for a single run.

	// Reset variables and re-scan properly based on input structure.
	sc = bufio.NewScanner(os.Stdin)
	targetVal := 0
	
	// Read target from first line
	if !sc.Scan() {
		return 
	}
	fmt.Sscanf(sc.Text(), "%d", &targetVal)

	numCountMap := make(map[int]int)
	pairsFound := 0

	for sc.Scan() {
		lineContent := sc.Text()
		var n int
		_, err := fmt.Sscanf(lineContent, "%d", &n)
		
		if err != nil {
			continue // Ignore lines with non-integer content or empty lines
		}

		if complementarySum := targetVal - n; complementCount, exists := numCountMap[complementarySum]; exists {
			pairsFound += complementCount
		}

		numCountMap[n]++
	}

	fmt.Printf("pairs=%d\n", pairsFound)
}
