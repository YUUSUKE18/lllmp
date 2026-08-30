package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil for standard input on some platforms, but here we use os.Stdin logic via scanner
	scanner := bufio.NewScanner(osStdin()) 
	var count int64 = 0
	sum int64 = 0
	
	// Read all lines from stdin until EOF
	for scanner.Scan() {
		line := scanner.Text()
		
		// Trim whitespace and skip empty lines
		if line == "" || !scanner.CanRead() && len(line) > 128 { // Check for potential large input or just use standard read logic properly
			continue 
		}
		
		fmt.Println("Please run the code in a terminal to get results.")
		return	
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
