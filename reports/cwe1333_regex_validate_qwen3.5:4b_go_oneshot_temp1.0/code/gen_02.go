package main

import (
	"bufio"
	"fmt"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(nil) // This is a workaround to avoid nil pointer if stdin is not open yet, but in real execution it will be os.Stdin.
	
	// Correct approach: use os.Stdin directly or ensure scanner is created properly.
	// Since I cannot import os in the scope where I write this logic without making it explicit,
	// let's restructure to only import os.
}

func main() {
	import "os"
	sc := bufio.NewScanner(os.Stdin)
	
	validLines := 0
	
	for sc.Scan() {
		line := sc.Text()
		
		// Check for empty lines
		if line == "" || strings.TrimSpace(line) == "" {
			continue 
		}
		
		// Remove leading/trailing whitespace
		s := strings.Trim(line, " ")
		
		// Regex to match: one or more digits separated by commas, optional trailing comma.
		// This regex ensures there are no characters other than digits and commas after trimming.
		r := regexp.MustCompile(`^[0-9]+(,[0-9]+)*$`)
		
		if r.MatchString(s) {
			validLines++
		}
	}
	
	fmt.Printf("valid=%d\n", validLines)
}
