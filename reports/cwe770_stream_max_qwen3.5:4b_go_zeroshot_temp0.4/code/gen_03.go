package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil reader for stdin in some environments, but standard is usually fine. 
                                // However, to ensure it works with piped input or terminal:
	if r, err := bufio.NewReader(os.Stdin); err != nil {
		panic(err)
	} else {
		reader = r
	}

	var count int64
	maxVal := int64(-1<<62 - 100) // Initialize with a very small number. 
                                // Or better: use the first valid element to initialize max if possible, or handle empty case.
                                // Let's re-initialize logic below for correctness.

	// Re-reading input line by line until EOF (though spec implies single line of comma-separated ints)
	// The problem says "standard input from a comma-separated integer list". It might be one line or multiple lines? 
	// Usually, it means read all tokens from stdin. Let's assume we need to parse the whole stream.

	var first bool = true
	maxVal = int64(-1) // Default max is -infinity if no elements found yet. But 0 could be a valid value. 
                     // Actually, let's use a flag or initialize with min possible integer and check for updates.
                     // Since values are within 64-bit range, we can start with the smallest int64 but handle empty input separately?
                     // Wait, if there is at least one element, maxVal will be updated to that value on first iteration.

	// Correct approach: read all tokens from stdin until EOF. 
	// But Go's bufio.Scanner or reading line by line and splitting might be needed depending on input format.
	// Spec says "comma-separated integer list". It could be one long string like "1,2,3" or multiple lines?
	// Let's assume it's a single stream of tokens separated by commas (and potentially newlines).

	scanner := bufio.NewScanner(os.Stdin) // Use os.Stdin directly. 
                                        // But wait, the spec says "comma-separated". Scanner splits on whitespace by default.
                                        // We need to split manually or use regexp? Or read line and replace comma with space then scan.
                                        // Let's do: Read all input into a string buffer (or process token by token).

	// Actually, reading line by line is safer for large inputs than buffering everything in memory if not needed.
	// But since we just need count and max, we can iterate over lines and split each line by comma.

	maxVal = int64(-1<<62 - 5) // Start with a value smaller than any valid positive integer? 
                              // No, let's use the first element to initialize or handle empty case explicitly.
                              // If no elements are found, count=0, max=? The spec doesn't specify behavior for empty input, but implies there might be data.
                              // Let's assume at least one element exists if we output a line? Or maybe 0 and min_int64? 
                              // Given the constraints "values within 64-bit integer range", let's use int64(-1<<62) as initial max, but better yet:
                              // Initialize with the first valid number found.

	// Let's restructure reading logic to be robust.

	var elements []int64 // Collect all elements? No need to store if we process on fly. But collecting is fine for memory unless input is massive (unlikely in such specs). 
                       // Actually, processing on the fly is O(1) space.
                       
	maxVal = int64(-9223372036854775808 - 1) // Smaller than min_int64? No, just use a flag or initialize with first element.

	// Let's read all lines from stdin until EOF
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" || len(line) == 0 {
			continue
        }
        
        // Remove spaces around commas? Or just split by comma and then parse each token.
        parts := []string{}
        for _, c := range line {
            if c == ',' {
                continue 
            } else {
                // We can't easily build a string slice without knowing the length beforehand or appending.
                // Simpler: replace commas with spaces and then use strings.Fields? No, because we need to ignore non-integers anyway.
                // Let's just split manually by comma.
                
                if len(parts) == 0 {
                    parts = append(parts, "") 
                } else {
                    last := *parts[len(parts)-1]
                    // We can't modify the string in place easily without knowing length or using a buffer? 
                    // Actually, we don't need to replace. Just split by comma.
                    
                    if len(line) > 0 && line[0] == ',' {
                        parts = append([]string{""}, parts...)
                    } else {
                         last := *parts[len(parts)-1] + string(c) // This is wrong logic for building strings dynamically without pre-allocation? 
                         // Wait, Go's slice of bytes or rune can be used. But simpler: use regexp.Split? No external libs allowed except standard.
                         
                         // Let's do manual splitting into a byte array then convert to int64s directly skipping non-integers.
                    }
                }
            }
        }

	// Alternative approach for robust parsing without complex string manipulation:
	// Use bufio.Scanner with custom delimiter? No, Scanner doesn't support comma as default split char easily unless we set it up right (but standard Split is whitespace).
	
	// Let's read the entire input into a single byte slice or use regexp to find all integers. 
	// But regex might be overkill and potentially slow for very large inputs? No, stdlib only has basic ones.
	// Actually, we can just iterate through characters of each line, skipping commas and non-digit/non-minus chars until digits found.

	// Let's restart the parsing logic cleanly:
	
	maxVal = int64(-1) // Placeholder
	count = 0
	
	for scanner.Scan() {
		line := scanner.Text()
		
		i := 0
		n := len(line)
        
        for i < n && line[i] == ' ' || line[i] == '\t' || line[i] == ',' {
            i++ // Skip whitespace and commas. 
            if i >= n { break }
        }

        while true {
            start := -1
            
            // Find the next integer token starting at `i`
            for j := i; j < n && (line[j] != '-' && line[j] <= '9' || line[j] == '+' ) ; j++ {} 
            if j >= n { break }

            start = j - 1
            
            // Wait, we need to find the first digit or minus sign.
            // Let's re-scan from i: skip non-digit/non-minus until a valid char is found? No, just scan forward.
            
            for k := i; k < n && (line[k] == ' ' || line[k] == ','); k++ {} 
            if k >= n { break }

            // Found start of potential number at `k`. Check if it's valid digit or minus sign?
            // Actually, the problem says "ignore elements that cannot be interpreted as integers".
            // So we scan forward until a non-digit/non-minus char is found. If no such char exists (until end), then invalid? 
            // Or maybe just stop at first non-numeric character after skipping commas/spaces.

            numStr := ""
            
            for k < n && ((line[k] >= '0' && line[k] <= '9') || line[k] == '-') {
                if line[k] != '-' {
                    // It's a digit, append to string? No need to build string first. Parse directly.
                } else {
                     numStr = "-" + parseDigits(line[k+1:]) // This is messy. 
                }

            // Let's do it properly: find the start index of the number sequence.
            
            j := i
            for ; j < n && (line[j] == ' ' || line[j] == ','); j++ {}
            if j >= n { break }

            numStart = j
            
            // Now scan forward to capture digits and minus sign, stopping at first invalid char.
            end := j - 1 
            for k := i; k < n && (line[k] != ' ' && line[k] != ','); k++ {}
            
            if k >= n { break }

            // Re-evaluate: we need to extract the substring from `numStart` to `k-1`.
            // But wait, what if there are non-integers in between? The problem says "ignore elements that cannot be interpreted as integers". 
            // So if we see a comma or space, it separates numbers. If we see something else (like 'a'), then the current sequence is invalid and should be ignored entirely until next valid number?
            
            // Actually, simpler: replace all commas with spaces in each line, then use strings.Fields() to get tokens. Then try parsing each token as int64. 
            // If parse fails, ignore it. This handles "ignore non-integers" perfectly because `strconv.ParseInt` returns false on invalid input like 'a'.
            
            // But wait, if the string is empty? handled by fields returning nothing.
            // What about negative numbers? strconv.ParseInt handles them correctly with base 10 and sign check (assuming no extra chars). 
            // Example: "-abc" -> ParseInt returns error because it expects only digits after minus or just invalid format. Correct.
            
            // So the plan:
            // 1. Read line. Replace ',' with ' '. Trim? No need to trim if fields() handles leading/trailing spaces.
            // 2. Split by whitespace using strings.Fields(). 
            // 3. For each token, try ParseInt(token). If success, update count and max.

        }
        
	}
	
	fmt.Printf("count=%d max=%d\n", int(count), maxVal)
	
	os.Exit(0)
}
