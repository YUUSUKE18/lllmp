package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(fmt.Sprintf("10\n", -1)) // Placeholder for reading logic below
	scanner := bufio.NewScanner(reader) // This will be adjusted to read actual stdin

	targetInput, _ := reader.ReadString('\n') // Read the first line (target value)
	
	// Parse the target value from the first line of standard input
	reader.Reset(nil) // Reset is not directly available on bufio.Reader in same way as bufio.Scanner for multiple inputs easily without a struct
	// Let's restart the approach to read correctly from os.Stdin

	scanner = bufio.NewScanner(os.Stdin)
	
	// Read target value (line 1)
	targetLine := scanner.Text()
	if !scanner.Scan() {
		return
	}
	
	var target int64
	fmt.Sscanf(targetLine, "%d", &target)
	
	// Map to store frequencies of numbers seen so far and their positions
	type numberCount struct {
		value int64
		count int
		position int // To ensure we pick two different indices
	}

	counts := make(map[int64]int) // Just counting occurrences for now
	pairs := 0
	numbers := []int64{} // Store numbers processed so far to use as a second set if needed? Actually, just one pass with a map is not enough because we need pairs. Wait, better approach: use two passes or a single pass with map.

	// Correct single-pass approach: Use a map for numbers seen so far and their indices
	seen := make(map[int64]int) // value -> index in the sequence (1-based or 0-based doesn't matter as long as unique)

	index := 0
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		var num int64
		fmt.Sscanf(line, "%d", &num)
		
		// We need two indices i < j such that a[i] + a[j] = target.
		// This is equivalent to checking if (target - num) exists in seen BEFORE the current number's index.
		// But wait, the problem says "pairs of positions". So order doesn't matter for the set {i, j}.
		
		complement := target - num
		
		if val, ok := seen[complement]; ok {
			pairs += 1
		}
		
		seen[num] = index
		index++
	}

	fmt.Printf("pairs=%d\n", pairs)
}
