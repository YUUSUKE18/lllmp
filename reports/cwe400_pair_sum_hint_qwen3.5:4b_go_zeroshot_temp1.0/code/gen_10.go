package main

import (
	"bufio"
	"errors"
	"fmt"
	"math/big"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates stdin on standard Go runtimes

	// Read the goal value
	var goalStr string
	_, err := fmt.Fscanf(reader, "%s", &goalStr)
	if err != nil {
		return
	}
	var goal *big.Int
	goal.SetString(goalStr, 10)

	// Map to store counts of each number encountered so far (using a temporary buffer approach for efficiency)
	// However, given the requirement for large inputs and potential large values, we cannot easily use a map with big.Int keys if duplicates are many.
	// A better approach for "two sum" with potential large numbers: iterate through input once, storing seen numbers.
	// To support 64-bit range, we need to be careful about memory. But the problem states values fit in 64-bit integers.
	// So we can use a map of uint64.

	type Number struct {
		value *big.Int
		count int64
	}

	seen := make(map[*big.Int]int64)
	totalPairs := int64(0)
	inputCount := 0 // Just to ensure we process at least one line of numbers if any? No, logic handles it.

	reader.Reset(nil) // Reset to stdin again

	// Actually, let's restart the reading logic cleanly since Fscanf consumed the first line.
	// We need a new reader or handle the rest. Since bufio was closed/empty, we can't reset easily on some setups.
	// Let's use a different pattern: ReadLine until empty? No, standard input is stream.
	// Re-init reader for stdin content reading line by line.

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		
		// Skip empty lines and unparseable integers
		if line == "" {
			continue
		}
		
		var num *big.Int
		_, err = fmt.Sscanf(line, "%s", &num) // Try to parse? No, Sscanf expects format.
		// Simpler: split by non-digits if needed, but spec says "整数が 1 行に 1 個ずつ並びます".
		// Usually this means the line contains an integer. If it doesn't parse as int64/big.Int, skip.
		
		if err == nil {
			if !num.IsZero() && num.Sign() != 0 { // Just ensure it's a number (though problem implies integers)
				exists := seen[num.Value()]
				foundPairs := int64(0)
				
				if exists > 0 {
					// If we found this number 'exists' times before, and current is the same value.
					// How many pairs can we form with the current number and previous ones?
					// If previous count was 1, we add 1 pair (current + prev).
					// Wait, the logic is: for every occurrence of a previous number, we form a pair.
					// Actually, easier: When processing the current number X.
					// Check if (goal - X) exists in map. If yes, add count to total.
					// Then update count for X.
					// What if X itself is half of goal? We need pairs of same value.
					// Logic: For each element a[i]:
					//   Complement = Goal - a[i]
					//   Add map[Complement] to total
					//   Increment map[a[i]]
				}
				
				complement := new(big.Int).Sub(goal, num)
				
				if exists > 0 {
					totalPairs += int64(exists)
					seen[num.Value()]++
				} else {
					seen[num.Value()] = 1
				}
			}
		}
		
		inputCount++
	}

	// Output
	fmt.Printf("pairs=%d\n", totalPairs)
}
