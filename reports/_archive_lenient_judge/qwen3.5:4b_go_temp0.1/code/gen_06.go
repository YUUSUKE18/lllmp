package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go without arguments, we should use os.Stdin or similar logic if needed, 
	// but the spec says "standard input". Let's assume it might be empty or have content.
	// Since bufio.NewReader(nil) is not valid for reading from stdin directly like this, let's adjust.

	reader = bufio.NewReader(osStdinPlaceholder()) // This won't work without os import and proper setup. 
	// Correct approach: use fmt.Fscan with a custom scanner or just read all lines.
	
	// Let's rewrite to be robust using standard packages only (os is allowed as it's stdlib).
}

import "os"

func main() {
	var nums []int64
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		
		// Skip empty lines and whitespace-only lines
		if line == "" || len(line) == 0 {
			continue
		}

		// Split by comma or space? Spec says "comma-separated", but also mentions ignoring elements that can't be interpreted as integers.
		// Usually, if it's a list like "1,2,3" we split by ','. If there are spaces around commas too, trim them.
		parts := []string{}
		
		// Simple approach: replace all non-digit characters (except minus sign) with space? No, spec says comma-separated integers.
		// Let's assume input format is like "1, 2 ,3" or just "1,2,3". 
		// We'll split by ',' and then parse each part as int64. If parsing fails (non-integer), ignore it.

		for _, p := range []string{line} {
			if len(p) == 0 || p[0] == ' ' && p[len(p)-1] == ' ' { // Check if line is just spaces? No, split first.
				continue 
			}
			
			// Split by comma
			subParts := []string{}
			current := ""
			for _, c := range p {
				if c == ',' || (c == ' ' && current != "") { // Treat space as separator if it appears between numbers? Or just split by comma.
					// Spec says "comma-separated". Let's strictly split by ','. 
					// But also handle potential spaces around the number inside a part.
				} else {
					current += string(c)
				}
			}
			
			if current != "" && (current[0] == ',' || current[len(current)-1] == ',') { // Handle trailing/leading comma issues if any? 
				subParts = append(subParts, "") // placeholder to avoid index out of bounds later logic errors.
			} else {
				subParts = []string{p}
			}

			for _, part := range subParts {
				if len(part) == 0 || (len(part) > 1 && part[0] != '-' && part[len(part)-1] != '-') { // Skip if not starting with digit or minus? 
					continue
				}
				
				val, err := strconv.ParseInt(part, 10, 64)
				if err == nil {
					nums = append(nums, val)
				} else {
					// Ignore elements that cannot be interpreted as integers.
				}
			}
			
			break // Only process one line? Or all lines until EOF? "Standard input from comma-separated integer list". Usually implies a single stream of numbers separated by commas, possibly across newlines or just one line. 
			// If the input is multiple lines like:
			// 1,2
			// 3,4
			// We should process all tokens found in all lines.
			
			// Re-evaluating logic to be simpler and more robust for "standard input":
			// Read entire stdin into a string or token by token? 
			// Let's use bufio.Scanner which reads line by line, then split each line by comma.
		}

		// Wait, the above loop structure is messy because I'm mixing imports and logic inside main incorrectly in thought process.
		// Correct implementation below:
		
		_ = scanner // dummy to avoid unused warning if we restructure properly later.
		return 
	} else {
		fmt.Println("count=0 sum=0")
		return
	}

	// Final clean logic structure:
	
	var count int64
	sum := int64(0)
	numsSet := make(map[int64]bool) // Using map to track unique numbers easily? 
	// Wait, spec says "count of 'unique integers'". So we need the number of UNIQUE values.
	// And sum is total sum of those unique values.
	
	seen := make(map[int64]struct{})
	totalSum := int64(0)

	scanner = bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		
		if line == "" || len(line) < 1 { // Skip empty lines
			continue 
		}

		// Split by comma. Also handle spaces around numbers if any? Spec says "comma-separated".
		// Let's assume input is like: "1,2,3" or "1 , 2 , 3".
		// We can replace all commas with newlines and then split lines? Or just use strings.Split.
		
		parts := strings.Split(line, ",")

		for _, part := range parts {
			part = strings.TrimSpace(part) // Remove spaces around the number
			
			if len(part) == 0 || (len(part) > 1 && !isDigitOrMinus(part[0])) { 
				continue 
			}
			
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue // Ignore non-integer elements.
			}

			if _, exists := seen[val]; !exists {
				count++
				totalSum += val
				seen[val] = struct{}{}
			}
		}
		
		fmt.Printf("count=%d sum=%d\n", count, totalSum) // Wait, output format is "count=<int> sum=<int>". 
		return 
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

	// If no numbers found? The spec doesn't explicitly say what to do with empty input.
	// Assuming count=0, sum=0 is safe default if nothing parsed.
	
	fmt.Printf("count=%d sum=%d\n", 0, 0) // Fallback or handle inside loop logic properly.

}

func isDigitOrMinus(c byte) bool {
	return c >= '0' && c <= '9' || (c == '-' && len([]byte{}) > 1) // This helper needs context of length? 
	// Actually, simpler: just try to parse int64 directly from the trimmed string. If it fails, ignore.

func main() {
	var count int64 = 0
	sum := int64(0)
	seen := make(map[int64]struct{})

	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		
		if line == "" || len(line) < 1 { // Skip empty lines? Or just skip if no content.
			continue 
		}

		parts := strings.Split(line, ",")

		for _, part := range parts {
			part = strings.TrimSpace(part)
			
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil || len(strings.TrimSpace(part)) == 0 { // Ignore non-integers or empty after trim.
				continue 
			}

			if _, exists := seen[val]; !exists {
				count++
				sum += val
				seen[val] = struct{}{}
			}
		}
		
		fmt.Printf("count=%d sum=%d\n", count, sum) // Wait, this prints every line? No! 
		// Spec says: "Output exactly one line". So we must accumulate and print once at the end.

		return 
	} else {
		if err := scanner.Err(); err != nil {
			panic(err)
		}
		
		fmt.Printf("count=%d sum=%d\n", count, sum) // Print only after loop finishes.
	}

// Corrected Final Code Block:
