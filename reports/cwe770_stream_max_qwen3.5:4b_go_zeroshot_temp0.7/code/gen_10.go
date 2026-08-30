package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	input, err := os.Stdin.ReadBytes(0) // Read until EOF in a non-blocking way or handle input differently? Actually stdin is usually read via bufio. Let's use standard practice for competitive programming style inputs which might be piped. But Go doesn't have an 'EOF' specific function easily without reading all.
	// Re-reading spec: "Standard Input". Usually implies reading until EOF if no line count given, or one line per test case? The spec says "integer sequence separated by commas", implying a single dataset. Let's assume we read the entire input buffer first as bytes to handle potential newlines/whitespace robustly.
	// However, `os.Stdin.ReadBytes` without an argument isn't valid (needs limit). We should use `bufio.Scanner`.

	scanner := bufio.NewScanner(os.Stdin)
	var tokens []string
	
	for scanner.Scan() {
		line := scanner.Text()
		parts := split(line) // Our custom split function
        
        if len(parts) == 0 { continue }
        
        for _, p := range parts {
            val, err := strconv.ParseInt(p, 10, 64)
            if err != nil {
                continue 
            }
            tokens = append(tokens, fmt.Sprintf("%d", val)) // Store as string to count easily? No, we need max. Let's store int directly in a map/list logic but here simple loop is enough. Actually just collect all valid ints.
        }
	}

	count := len(tokens)
	if count == 0 {
		fmt.Println("count=0 max=") // Wait, if no elements, what is max? Usually undefined or empty string after space? Spec says "max=<value>". If list is empty, max might be meaningless. But let's assume at least one valid int exists per spec implication ("elements"). Or handle gracefully: count=0 max=.
		fmt.Println("count=" + strconv.Itoa(count) + " max=") // This line format requires a value if not zero? Let's re-read carefully. If empty, maybe just print nothing for max part or keep it as is. 
	} else {
		maxVal := tokens[0]
		for i := 1; i < count-1; i++ { // Wait, my logic above storing strings was wrong for comparison? I need to parse them back or store ints. Let's restart the parsing loop cleanly below in the actual code block.
			// Actually, simpler: collect all valid integers into a slice of int64 first.
        }
    }

	// Correct Logic Implementation Block
	validInts := []int64{}
	for scanner.Scan() { // Re-scan or reuse? Scanner consumes input. We need to parse line by line properly inside one pass. Let's rewrite the loop structure clearly in Go code block below without comments on logic errors here.

	// Final clean implementation plan:
	// 1. Read all lines from stdin using bufio.Scanner (handles whitespace/newlines automatically).
	// 2. For each token, parse int64. Ignore if invalid.
	// 3. Count valid ints and find max.
}
