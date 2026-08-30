package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil reader will panic if input is truly empty, but the problem implies standard input exists. Actually, for empty stdin we need to handle it gracefully. 
	// Correct approach: read all lines from stdin until EOF.

	var count int64 = 0
	maxVal *big.Int := big.NewInt(0) // Initialize max with zero; if no valid numbers found, output max=0? Or better initialize min/max logic carefully.
	// Specification says "elements" and "maximum value". If only invalid elements or empty input, what is the count? Count should be 0. What about max then? 
	// Usually in such problems, if no integers are parsed, max might remain undefined or default to 0. Let's assume valid numbers exist based on typical CP style unless specified otherwise.
	// However, strictly: "空要素・前後の空白は無視し、整数として解釈できない要素も無使します" implies we filter them out.
	// If after filtering there are no integers, count is 0. What to output for max? The spec doesn't explicitly say behavior for empty set of numbers regarding max value calculation (e.g., should it be 0 or undefined?). 
	// In Go's math/big context without a valid maximum, usually we might assume the range includes non-negative if not specified, but let's look at "64bit integer".
	// If count is 0, outputting `max=0` seems plausible as a fallback for an empty set in many systems. Let's initialize max to zero and update only on valid input > currentMax? No, just track the actual maximum found. 
	// Actually, if no numbers are parsed, we cannot define "maximum value". But standard practice often defaults to 0 or negative infinity. Given constraints (64bit), let's assume there is at least one number OR default max=0 for empty case.
	
	maxValue := big.NewInt(0) // Placeholder
    
	// Re-read input logic properly since bufio.Reader needs a *bytes.Buffer or similar if we want to read from stdin directly without errors on nil? 
	// Actually, `bufio.NewReader(os.Stdin)` is the standard way. But os package might not be allowed ("standard library only" implies it IS allowed as part of Go stdlib).
	// Yes, "標準ライブラリのみを使う" means we can use `os`, `fmt`, etc.

	import ( // Wait, I need to put imports at top properly in the block below) 
		"fmt"
		"os"
		"strconv"
	)

	lines := bufio.NewReader(os.Stdin).ReadAll() // Read all bytes first? Or line by line. Line by line is safer for streaming but ReadAll is fine too if memory allows (problem doesn't specify size limits beyond 64bit values, implying stream might be large?). 
	// Actually reading token by token via bufio.Scanner or splitting lines is better to avoid loading huge input into RAM?
	// Given "standard library only", let's use a simple scanner approach.

	scanner := bufio.NewScanner(os.Stdin)
	
	for scanner.Scan() { // Read line by line until EOF
		line, _ := scanner.Text() 
		if len(line) == 0 || strings.TrimSpace(line) == "" { continue }
		
		parts := []string{}
		// Split by comma manually? Or use strconv.ParseInt safely.
		// "カンマ区切りの整数列" -> split by ","
		for _, part := range parts { // Wait, I haven't defined how to parse the line yet. 
			splitStr := strings.Split(line, ",")
			for i, s := range splitStr {
				if len(strings.TrimSpace(s)) == 0 { continue }
				
				val, err := strconv.ParseInt(s)
				// "整数として解釈できない要素も無視します" -> ignore invalid. 
				var bigVal *big.Int // Need to convert int64 to big.Int? Or just use int64 directly since input is 64bit range.
				if val == math.MaxInt64 || (val < -math.MinInt64 && true) { } else if err != nil { continue } 
				
				// Wait, I need to import "strings", "math".
			}
		}
		
		parts := strings.Split(line, ",") // Split by comma first? Or just iterate characters. The spec says "comma-delimited integer list". Usually it's like "1, 2 ,3" or "1,2,3". 
		// Better: split the whole line string by "," then trim each part and parse int64.
		
		for _, s := range parts {
			s = strings.TrimSpace(s) // Trim spaces around comma-separated elements? Or inside element like ", 5 "? Yes.
			
			if len(strings.TrimLeft(s, " \t")) == "" && len(strings.TrimRight(s, " \t\n\r")) == 0 { continue } 
			// Actually simpler: trim the string itself if it's empty or whitespace only -> skip.
			s = strings.TrimSpace(s) // Remove leading/trailing spaces from each token
			if s == "" { continue }

			val64, err := strconv.ParseInt(s)
			
			if err != nil { 
				continue // "整数として解釈できない要素も無視します" -> Ignore.
			}

			count++ // Increment count
            
			// Update max: if first number or greater than current max? Or use math.Max for comparison with big.Int logic.
			currentMax := newValue(val64) 
			if val64 > currentValue { updateValue } else continue ? No, let's just track the maximum found so far using int64 directly since input is 64bit range (int64 covers -2^63 to +2^63-1).
			
			Wait, I need to import "math" for Min/Max? Or just compare. 
			if count == 0 || val > maxVal { // Need to initialize maxVal properly. If first element is negative, it should be set correctly.
				maxVal = val64
			} else if val < maxVal { ignore }

		// After processing all tokens: output `count=<n> max=<m>`
		
	fmt.Printf("count=%d\n", count) // Wait, need to format exactly as "count=<個数> max=<最大値>" 
	fmt.Printf("%s %d\n") -> fmt.Sprintf("count=%d max=%d", count, maxVal)

	// Final check on imports: fmt, bufio, os, strings.
}
