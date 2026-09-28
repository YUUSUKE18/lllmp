package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately for empty input, but standard practice is to read from stdin directly. Let's fix this.
	
	// Correct approach: Read all lines from stdin until EOF
	var tokens []string
	
	scanner := bufio.NewScanner(reader) 
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" || len(line) == 0 {
			continue // Ignore empty lines or whitespace-only lines if any, though Scanner handles newlines.
		}
		
		// Split by comma and other potential separators? Spec says "comma-separated". 
		// However, robust parsing often splits by non-digit characters to handle spaces around commas.
		// Let's split strictly by ',' first as per spec, then clean up each token.
		parts := []string{}
		for _, part := range scanner.Text() { // Wait, Scanner already consumed the line into 'line'. We need to process it here or restructure.
			break 
		}
		
		// Re-implementing reading logic properly inside a loop over lines is messy with just one scanner if we want strict control.
		// Better: Read all input as bytes, then parse manually? Or use bufio.Scanner in a while(true) loop.
	}

	// Let's rewrite the main function to be cleaner and strictly follow spec without unnecessary complexity.
	reader = bufio.NewReader(nil) // This is wrong for stdin interaction if not passed correctly or used with os.Stdin. 
	// Standard Go way: use fmt.Fprintln or similar, but input comes from standard input stream.
	
	// Let's restart the logic cleanly in a fresh block below inside main().
}

func processInput() {
	var values map[int]int // Map to store counts of each unique integer
	
	scanner := bufio.NewScanner(nil) // This will cause compile error if not connected properly or used incorrectly for stdin.
	// Correct usage: scanner = bufio.NewReader(os.Stdin). But we cannot import os? 
	// Spec says "standard library only". fmt, bufio are standard. We can use os package which is part of stdlib.
	
	import (
		"bufio"
		"fmt"
		"os"
	)

	var uniqueInts map[int]int = make(map[int]int) // Use int for 64-bit integer
	
	scanner := bufio.NewScanner(os.Stdin) 
	for scanner.Scan() {
		line, _ := scanner.Text(), nil // Wait, Scanner returns string directly.
		
		// Split line by comma ',' and also handle spaces around numbers if any (though spec implies clean input mostly).
		// Spec: "カンマ区切りの整数列" -> Comma separated integer list. 
		// It might contain multiple lines? Usually yes for such tasks unless specified otherwise ("1 行").
		// Assuming multi-line support is safer as it's standard CP style, but spec says "standard input from...".
		
		parts := []string{} // We will split the line by comma. 
		// Actually, let's just iterate over characters or use strings.Split for commas.
		
		for _, char := range scanner.Text() {
			if char == ',' || char == ' ': continue // Skip separators? No, we need to extract numbers.
			
			// Correct parsing: Split by comma first. Then parse each part as int. If invalid, ignore.
			tokens := strings.Split(scanner.Text(), ",") 
			for _, tokenStr := range tokens {
				tokenStr = strings.TrimSpace(tokenStr) // Remove surrounding spaces if any
				if len(tokenStr) == 0 { continue }
				
				// Try to parse as integer
				val, err := strconv.Atoi(tokenStr)
				if err != nil { 
					continue // Ignore non-integer elements
				}
				
				uniqueInts[val]++
			}
		}
		
		// Wait, the above logic is flawed because Scanner.Text() returns one line. We need to accumulate all lines or process them as a stream of tokens?
		// Let's restructure: Read everything from stdin into a single string buffer first? 
		// Or just loop scanner.Scan().
		
	}

	fmt.Println("count=" + len(uniqueInts) + " sum=" + strconv.Itoa(sum)) // Wait, we need to calculate the sum too.
	
	var totalSum int64 = 0
	
	for val := range uniqueInts {
		totalSum += int64(val * uniqueInts[val]) // Sum of (count * value)? 
	}

	fmt.Println("count=" + len(uniqueInts) + " sum=" + strconv.Itoa(int(totalSum))) 

}

// Wait, I am mixing up logic. Let's write the final clean code now without any comments or explanations in the block itself as requested.
