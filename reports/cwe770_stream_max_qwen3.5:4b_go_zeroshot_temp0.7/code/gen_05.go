package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	input, err := os.Stdin.ReadBytes(0) // Read entire input until EOF? Actually stdin is a stream. Let's read all available data properly using bufio or just standard pattern for typical CP problems where input might be piped in chunks or one line. 
	// Re-reading: "標準入力から" usually implies reading from os.Stdin. In many competitive programming environments, the entire content of stdin is provided at once (e.g., via file redirection). However, if it's an interactive stream, we need to handle EOF gracefully.
	// A robust way in Go for "read all input": use a buffer or read until close. Since `os.Stdin` doesn't have ReadAll directly accessible without creating a reader, let's construct one from os.Stdin which buffers internally? Actually `bytes.NewReader(os.Stdin)` works if the stream closes (EOF).
	// Wait, in standard CP environments with file input redirection, stdin is finite and EOF comes immediately. Let's use `bufio.Scanner` or just read all bytes into a string buffer by reading chunks until error != nil && n == 0? 
	// Simpler: Read the whole thing if we assume it fits in memory (common for such specs). But to be safe against large inputs, let's iterate lines.
	
	scanner := bufio.NewScanner(os.Stdin) // Wait, I forgot `bufio`. Let me re-import and fix imports below before writing code block logic carefully without missing dependencies or assuming too much about the input format beyond "comma separated integers". 
	// Actually, standard Go solution for reading all tokens:
}

import (
    "bufio"
    "os"
)

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    
    // We need to read line by line or token by token? The spec says "comma separated integer list". It might be multiple lines. 
    // Let's assume the input is a single stream of text containing numbers and commas, possibly with whitespace/newlines mixed in.
    var count int64 = 0
    
    // To handle arbitrary number of integers until EOF:
    for scanner.Scan() {
        line := scanner.Text()
        
        // Split by comma or just process tokens? 
        // Spec says "comma separated". But also "empty elements and surrounding whitespace ignored". 
        // It's safest to split the whole input content into a list of potential numbers, filtering out non-integers.
        // Since we are reading line by line with Scanner.Text(), let's accumulate all lines or just process each line as a string containing comma-separated values?
        // The most robust interpretation: "comma separated integer sequence" means something like "1, 2, , 3". 
        // We can split the entire input into tokens based on commas and spaces.
        
        parts := []string{line}
        if line != "" && (len(line) > 0 || true) {
            // Actually Scanner.Text() returns one line. If there are multiple lines, we process them all.
            for _, partStr := range parts { 
                // Replace commas and spaces with a delimiter to split easily? Or just use strings.Split on comma then trim each element.
                
                subParts := strings.Fields(partStr) 
                // Wait, if input is "1, 2", Fields might give ["1,", "2"]. No, Fields splits by whitespace only. Commas remain attached?
                // Better approach: split the whole line (or accumulated text) by comma first, then trim and parse each chunk.
                
                tokens := strings.Split(partStr, ",") 
                for _, token := range tokens {
                    sTrimmed := strings.TrimSpace(token)
                    if len(sTrimmed) == 0 || !isNumericString(sTrimmed) {
                        continue // Ignore empty or non-integer elements (like "abc"?) Spec says integers only. If not integer, ignore.
                    }
                    
                    val, err := strconv.ParseInt(sTrimmed, 10, 64)
                    if err != nil {
                        continue 
                    }
                    
                    count++ // Incremented? No wait: spec asks for 'count' (number of elements found?) and 'max'.
                            // Wait, "those number of elements" -> how many valid integers were there.
                    if val > maxVal || len(elements) == 0 { 
                        maxVal = val
                    }
                }
            }
        }
    }

    fmt.Printf("count=%d max=%d\n", count, maxVal) // Wait variables must be defined inside loop or global. Let's rewrite logic cleanly in the final block without helper functions if possible to keep it simple and correct.
}
