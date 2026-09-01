package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	if !sc.Scan() {
		fmt.Println("pairs=0")
		return
	}
	target, _ = sc.ReadArg() // Assuming ReadArg isn't in stdlib, need manual parsing

	// Re-read input to get target properly (since we can't re-scan stdin easily without buffering)
	// Actually, let's restart the logic: read all lines into a buffer or process line by line carefully.
	// Since Go doesn't have a built-in way to rewind stdin, we'll use bufio.Scanner which buffers internally.
	// However, to be safe against large inputs and ensure we get the first line as target, let's use a custom reader.
	
	// Reset approach: Read all input into a slice of strings first? No, that might consume too much memory for "adversarial" large inputs if not careful.
	// But wait, the problem says "2nd line onwards", implying we read line by line.
	// Let's use bufio.Scanner but handle the target separately.
	
	// Actually, a better way is to read the entire input into memory? 
	// The problem says "adversarial large inputs" and "practical time/memory". 
	// If the input is huge (millions of lines), storing all integers might be too much memory.
	// But we need to find pairs that sum to target. This is a classic 2Sum problem.
	// We can use a hash map (map[int64]int) to store frequencies seen so far.
	
	// Let's re-read the input properly.
	r := bufio.NewScanner(os.Stdin)
	
	// Read target from first non-empty line
	var targetVal int64
	firstLineFound := false
	for r.Scan() {
		line := r.Text()
		if line == "" {
			continue // ignore empty lines
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // ignore non-integer lines
		}
		targetVal = val
		break
	}
	
	if !firstLineFound && targetVal == 0 {
		// If first line was empty or invalid, we might not have a valid target. 
		// But the spec says "target is given on the 1st line". Let's assume valid input per spec.
		// If no target found, output 0 pairs.
		fmt.Println("pairs=0")
		return
	}
	
	// Now process subsequent lines
	count := 0
	
	// We need a map to store counts of numbers seen so far
	freqMap := make(map[int64]int)
	
	for r.Scan() {
		line := r.Text()
		if line == "" {
			continue // ignore empty lines
		}
		
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // ignore non-integer lines
		}
		
		complement := targetVal - val
		
		// Check if complement exists in the map
		if freqMap[complement] > 0 {
			count += freqMap[complement]
		}
		
		// Update frequency of current value
		freqMap[val]++
	}
	
	fmt.Printf("pairs=%d\n", count)
}

// Note: The above code has a logic error in reading target. Let's fix it properly.
// We cannot use 'break' after the first valid line if there are subsequent lines to read for target? 
// No, target is ONLY on the 1st line. So we stop reading after the first non-empty, parseable line for target.

func main() {
	r := bufio.NewScanner(os.Stdin)
	var targetVal int64
	
	// Read until we find a valid integer for target (1st line logic)
	for r.Scan() {
		line := r.Text()
		if line == "" {
			continue
		}
		
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		targetVal = val
		break
	}
	
	// If no valid target found (e.g., first line was empty or non-integer), output 0
	if targetVal == 0 && r.Scan() { // This check is flawed because we already scanned once.
		// Let's restart the scanner logic cleanly.
		fmt.Println("pairs=0")
		return
	}
	
	// Actually, let's rewrite main to be absolutely correct and efficient.
	// We'll read all lines into a slice? No, too much memory for adversarial inputs.
	// We process line by line.
	
	// Re-implementing main from scratch with correct flow:
}
