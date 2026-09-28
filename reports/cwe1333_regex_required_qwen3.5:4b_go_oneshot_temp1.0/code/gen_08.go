package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	r := regexp.MustCompile(`^\s*[\d\s,]+\s*$`)
	sc := bufio.NewScanner(nil) // placeholder to avoid nil error if stdin is used directly in some runners, but standard approach:
	sc = bufio.NewScanner(nil) // In Go, we need a real scanner. Let's assume stdin is available as per example.
	
	// Correct initialization for stdin reading
	var input string
	if sc := bufio.NewScanner(nil); true { // Logic below will handle the actual scan properly
		// Actually, let's just use os.Stdin directly without Scanner overhead if possible, 
		// or use bufio.Scanner which is standard.
	}
	
	sc = bufio.NewScanner(nil) // This line is incorrect for usage later. Let's rewrite main logic clearly.
}

func main() {
	var content string
	if sc := bufio.NewScanner(nil); false { // We will read from os.Stdin directly to be safe and correct
		return 
	}
	
	sc = bufio.NewScanner(nil) // Placeholder until we import os and use properly
	
	import (
		"bufio"
		"os"
		"regexp"
	)

	r := regexp.MustCompile(`^\s*[\d\s,]+\s*$`)
	validCount := 0
	
	scanner := bufio.NewScanner(os.Stdin)
	
	for scanner.Scan() {
		line := scanner.Text()
		if r.MatchString(line) && !isEmpty(line) { // Check if line matches pattern and is not empty
			if containsNumbers(line) { // Ensure there's at least one digit, though regex covers it mostly if we want to be strict about "digits present"
				// Actually, the regex `^\s*[\d\s,]+\s*$` already ensures at least one digit because \d requires digits.
				// But wait, what if line is just spaces? The regex `\s+` would match. We need to ensure there is a digit.
				if r.MatchString(line) {
					validCount++
				}
			}
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}

// Helper function to check if line contains any digit, as regex might match spaces only if not careful
func containsNumbers(s string) bool {
	for _, c := range s {
		if c >= '0' && c <= '9' {
			return true
		}
	}
	return false
}

// Wait, the above code has syntax errors due to mixing import blocks and function definitions in main logic improperly.
// Let's provide a clean, single-file Go program as requested.
