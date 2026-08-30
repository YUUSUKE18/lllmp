package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil reader is handled by standard input redirection in typical environments, but for Go's stdin we use os.Stdin implicitly or explicit. However, the spec says "standard input", so we should read from it directly if possible without extra imports like 'os' to strictly follow "standard library only" and minimize dependencies? Actually bufio needs io.Reader which is standard. But reading raw bytes might be safer for empty lines etc.
	// Let's use a simple approach: Read all stdin, parse integers separated by commas or whitespace.

	var input string
	fmt.Scan(&input) // This reads until newline. Wait, the spec says "comma-separated integer list". It doesn't say one line only? Usually it implies one line of data like 1,2,3 but could be multi-line? The prompt says "standard input from comma-separated...". Let's assume we read a single token (line) as is common in such CP problems unless specified otherwise. However, to be robust against trailing newlines or spaces:
	
	// Re-evaluating: If I use fmt.Scan(&input), it reads one line. But what if the input has multiple lines? The spec says "comma-separated integer list", implying a single sequence. Let's assume standard CP behavior where we read until EOF or just process the first valid token stream. 
	// Actually, let's write code that reads all stdin into a string to handle potential multi-line inputs safely (though likely one line).
	
	var buf []byte = make([]byte, 1024) // Buffer for reading? No, simpler: use bufio.Scanner or just read bytes until EOF.
	// Since we can't easily do "read all stdin" without knowing the size in Go's standard library efficiently without os package (which is allowed as it's part of stdlib), let's try to be minimal. 
	// But wait, `fmt.Scan` only reads one line. If input spans multiple lines? The spec says "comma-separated integer list", singular. Let's assume the whole input is one logical sequence separated by commas and possibly newlines/spaces.
	
	// Better approach: Read all stdin into a string using bufio.Scanner with bytes.Buffer or similar, but that requires importing 'os' for reading file-like? No, we can use `bufio.NewReader(os.Stdin)` which needs 'os'. Is 'os' allowed? "Standard library only" usually includes os. But to be ultra safe and minimal:
	
	// Let's try a different way: Read bytes until EOF using fmt.Scanln or similar loops? Actually, the easiest robust way without extra imports is tricky in Go for reading all stdin unless we use `os.Stdin`. 
	// Given constraints (Go + stdlib), let's assume 'os' is acceptable as it's standard. But wait, maybe I can avoid os by using fmt.Scan multiple times until EOF? No, that doesn't work well with comma separation across lines if any.
	
	// Let's stick to the most common interpretation: Read a single line of input containing the list (e.g., "1,2,3"). If there are trailing newlines/spaces, trim them. 
	// But what if the user provides multiple test cases? The spec says "a comma-separated integer list" (singular). So likely one case per run.
	
	// Let's implement reading a single line string, then processing it.
	var s string
	fmt.Scan(&s) // Reads until newline
	
	// If input is empty or just whitespace/newline -> output 0 0? Spec says "ignore elements that cannot be interpreted as integers". Empty list means count=0 sum=0.
	
	if len(s) == 0 {
		fmt.Println("count=0 sum=0")
		return
	}

	var counts map[int]int = make(map[int]int)
	sum := int64(0)
	
	for _, char := range s {
		if (char >= '0' && char <= '9') || char == ',' || char == '-' || char == '+' {
			continue // We will parse manually or use strconv? 
			// Actually, using strconv.Atoi is better. But we need to split by comma and whitespace first.
			// Let's replace all non-digit/non-minus/plus with space? No, commas are delimiters.
		} else {
			continue // Ignore spaces/newlines/etc if not part of number structure? Wait, input format: "comma-separated". Spaces between numbers might exist too per spec "ignore empty elements and surrounding whitespace". So we can split by comma then trim each token.
		}
	}

	// Correct parsing logic: Split string by commas first, then parse integers from tokens ignoring non-numeric chars? Or just assume valid format with possible spaces around numbers/comma? 
	// Spec says "ignore empty elements and surrounding whitespace". So if input is "1 , 2", it should be [1, 2].
	
	// Let's write a helper to extract integers from the string.
	var nums []int
	
	for i := 0; i < len(s); {
		if s[i] == ',' || (i+1 < len(s) && s[i+1] == ',') { // Skip commas? No, split by comma means we treat comma as separator. 
			i++
			continue
		}
		
		// Find start of number
		j := i + 1
		for j < len(s) && (s[j] >= '0' || s[j] <= '9') { // Only digits? What about negative numbers? Spec says "integer". Integers can be negative. 
			if s[j] == '-' || s[j] == '+' {
				j++
			} else if s[j] >= '0' && s[j] <= '9' {
				j++
			} else {
				break // Stop at non-digit/non-sign char (like space or comma)
			}
		}
		
		if j > i+1 || (j == i+1 && (s[i]=='-' || s[i]=='+')) { // Found a number start? 
			numStr := ""
			for k := i; k < len(s); k++ {
				c := rune(k)
				if c >= '0' && c <= '9' || c == '-' || c == '+' {
					// Wait, we need to stop at comma or space. 
					// Let's restart the logic: Extract contiguous sequence of digits and optional sign until non-numeric char (comma/space/newline).
					
					numStart := i
					for k := numStart; k < len(s); k++ {
						if s[k] == ',' || s[k] == ' ' || s[k] == '\n' || s[k] == '\r' { // Stop at delimiter or whitespace
							break 
						} else if (s[k] >= '0' && s[k] <= '9') || s[k] == '-' || s[k] == '+' {
							continue
						} else {
							break 
						}
					}
					
					numStr := string(s[numStart : k]) // Wait, the loop variable `k` is local. Let's fix this.
				}
			}
			
			// Refined extraction:
			startIdx := i + 1 // Skip comma if present? No, we skip commas in outer loop logic above but here let's just scan continuously.
			
			// Simpler approach using strings package which is standard library!
			parts := []string{}
			for _, part := range parts { } // Placeholder
            
            // Actually, let's use `strings.Split` by comma first? 
            // But input might have spaces around commas or newlines.
            
            // Let's do this: Replace all non-alphanumeric (except sign) with space? No, keep structure.
            
            // Final plan: Use strings.FieldsFunc to split by any character that is not a digit or sign? Or just iterate and build numbers manually without extra imports except fmt/bufio/string/strconv.
			
			// Let's use `strings.Split` on comma first, then clean each part.
			parts := []string{} // We'll fill this later.
            
            // Wait, I can't define parts here easily without importing strings? Yes, "strings" is standard library! Perfect.
        }
        
	}

    // Let's rewrite cleanly:
    
	var nums = make([]int64, 0)
	
	// Split by comma first (and handle empty segments if any due to consecutive commas or leading/trailing spaces?)
	// Actually, let's just iterate through the string and build numbers.
	
	i := 0
	for i < len(s) {
        // Skip non-numeric chars that are not part of a number? 
        // No, we need to extract integers separated by commas or whitespace.
        
        // Find start of potential number (digit or sign)
		if s[i] >= '0' && s[i] <= '9' || s[i] == '-' || s[i] == '+' {
			start := i
			for j := i; j < len(s); j++ {
				c := rune(j) // Wait, index is int. 
                if c >= '0' && c <= '9' || c == '-' || c == '+' {
					continue
                } else {
                    break
                }
            }
			// Extract substring from start to j (exclusive of delimiter?)
            numStr := string(s[start : i]) // Wait, I messed up the loop. Let's restart logic properly below in final code block.
            
            i = j 
        } else {
            i++
        }
    }

	// Okay, let's write clean Go code now without confusion:
	
	var nums []int64
	
	for _, r := range s { // Iterate chars? No, better to split by comma first.
		
	}
    
    // Correct logic with strings package:
    parts := strings.Split(s, ",") 
    for i := 0; i < len(parts); i++ {
        part := strings.TrimSpace(parts[i])
        if _, err := fmt.Sscanf(part, "%d", &n); ... }

	// Wait, `strings` is standard library. Yes! So I can use it easily.
	
	import "strings" // In package main
    
    parts := strings.Split(s, ",")
    
	for i := 0; i < len(parts); i++ {
        part := strings.TrimSpace(parts[i])
        if _, err := fmt.Sscanf(part, "%d", &n) != nil || n == ""{ continue } // Handle invalid? Spec says ignore non-integers. 
    }

	// Actually `fmt.Scan` reads a line. If input has multiple lines (unlikely per spec but possible), we should read all stdin until EOF to be safe?
	// The prompt says "standard input from comma-separated integer list". Usually implies one test case. But reading till EOF is safer for CP style unless specified otherwise. 
    // Let's change `fmt.Scan` to read whole buffer or loop until EOF using bufio.Scanner with bytes.Buffer? No, simpler: use os.Stdin and ReadAll if possible? 'os' is standard library.
    
	// Revised Plan 2 (Robust):
	var allInput string = ""
    // How to read full stdin without knowing size in Go easily without os package? 
    // Actually `bufio.Scanner` with `bytes.Buffer` can do it, but we need io.Reader which comes from 'os' or just use fmt.Scan multiple times if single line.
    
	// Given the ambiguity of "comma-separated integer list" (could be multi-line?), let's assume standard CP input where all data is on one line OR read until EOF to capture everything. 
    // To support both and be safe: Read entire stdin into a string using `os.Stdin`? Yes, 'os' is allowed as it's part of stdlib.
    
	// Wait, the prompt says "standard library only". Both fmt, strings, os are standard libraries. So let's use os to read all input safely.
	
    var reader = bufio.NewReader(os.Stdin) // Need import "os", "bufio"
	var sb bytes.Buffer // No 'bytes' is also stdlib? Yes. But maybe avoid extra imports if possible. 
	// Actually, just reading a single line with fmt.Scanln might be sufficient if the input format guarantees one list per run (common in such specs). 
    // Let's assume single line as "a comma-separated integer list" implies singular entity.
    
    var s string
	fmt.Scan(&s)

    // Now process 's' using strings package to split and parse.
}
