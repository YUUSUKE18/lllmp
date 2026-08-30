package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input correctly. Since standard input is a pipe in Go, reader should be initialized properly or use os.Stdin directly if available without extra imports for simplicity. Let's stick to the requirement of "standard library only".

	// Actually, using fmt.Scanln might block waiting for input even on EOF depending on environment,
	// but typically competitive programming environments provide input via stdin redirection.
	// A safer way with standard library is reading lines until EOF or parsing tokens directly.
	
	// However, the spec says "comma-separated integers". The most robust way in Go without external packages like bufio's ReadSlice 
	// (which isn't a thing) is to read all input and split by comma/non-digit characters.

	// Let's use fmt.Scanf or just read stdin line by line if necessary?
	// Actually, the spec implies we can receive multiple lines potentially containing commas.
	// But usually "standard input from" means reading until EOF.
	
	// Since bufio is standard library and provides a way to handle inputs effectively:
	reader = bufio.NewReader(nil) // Wait, this will cause panic or block? No, but it's better to use os.Stdin if we import os.
	// But the requirement says "standard library only". 'os' IS part of Go standard library. 
	// However, sometimes people prefer not importing extra packages for simple tasks.
	// Let's assume input is available via stdin and we can read it all at once or line by line.

	// Re-evaluating: The simplest approach without assuming complex multi-line structure but handling commas correctly:
	// Read the entire buffer from os.Stdin? Or just use fmt.Scanln in a loop until EOF? 
	// But input might be "1, 2 ,3" on one line or multiple lines.
	
	// Let's implement reading all tokens as strings and parsing them.

	var rawInput string
	
	// We need to read from stdin. Since we can't use bufio without defining reader properly (or using os.Stdin), 
	// let's import "os". It is standard library.
	imports := []string{"os", "fmt"} // Wait, I cannot write imports like that in the code block directly as a list variable.

	// Correct approach: Use fmt.Scanf or bufio.Scanner with os.Stdin.
	
	reader = bufio.NewReader(os.Stdin) 
	var tokens []string
	
	for {
		line, err := reader.ReadString('\n')
		if line == "" && err != nil { // EOF reached without newline? Or just break on error/EOF
			break
		}
		tokens = append(tokens, strings.TrimSpace(line)) // Wait, I need "strings" package too. 
		// Actually, splitting by comma is easier if we read line by line and split each part.
		
		// Let's restart the logic with proper imports: os, fmt, strconv, strings (if needed).
	}

	// Refined Plan:
	// 1. Import "os", "fmt", "strconv". 
	// 2. Read all lines from stdin until EOF.
	// 3. Join them or process line by line splitting by comma and whitespace.
	
	// Since the prompt says "comma-separated integers list" received from standard input, it could be a single string like "10,20,30".
	// Or multiple lines? Usually in such problems, if not specified as multi-line, it's one line or stream of tokens separated by commas.
	
	// Let's write code that reads all remaining stdin content into a buffer and processes it.

	input := "" // Placeholder
	
	// Actually, let's use the safest method: Read until EOF using os.Stdin directly via bufio.Scanner? 
	// Or just read line by line, split each line by comma, trim spaces, parse int.
	
	// Final Code Structure:
	/*
	import (
	    "bufio"
	    "fmt"
	    "os"
	    "strconv"
	    "strings" // needed for splitting? Yes, to handle multiple commas or empty strings between commas easily if we split by comma only. 
	              // But wait, spec says "comma-separated". So '1, 2' -> ['1', ' 2']. Splitting by ',' gives us the parts.
	)

	func main() {
	    scanner := bufio.NewScanner(os.Stdin)
	    var count int = 0
	    maxVal := -9223372036854775808 // MinInt64? Or just a flag for first element. 
	                                           // Better: use a boolean 'hasValue' and initialize with min possible value or handle logic differently.

	    var hasValue bool = false
	    
	    scanner.Scan()
	    line := scanner.Text()
	    if err, ok := scanner.Err(); ok && err != nil { return } // Handle error? Usually not needed for valid inputs but good practice.
	
	    parts := strings.Split(line, ",") 
	    for _, part := range parts {
	        s := strings.TrimSpace(part)
	        if len(s) == 0 { continue }
	        
	        val, err := strconv.Atoi(s) // This will panic or return error? Atoi returns int64. If invalid string, it panics in Go version <1.20? 
	                                    // In modern Go (>=1.9), strconv.Atoi parses and ignores leading/trailing whitespace if not trimmed? No, TrimSpace is done manually here.
	        // Wait, spec says "integers that cannot be interpreted as integers are ignored". Atoi returns error for non-ints. We must catch it or use a custom parser loop.
	        
	        val64 := int64(0) 
	        err = strconv.ParseInt(s, 10, 64) // Returns (val, err). If err != nil, ignore this element.
		if err == nil {
		    count++
		    if !hasValue || val64 > maxVal {
		        hasValue = true
		        maxVal = val64
		    }
	        }
	    }
	    
	    // Output format: "count=<n> max=<m>" with newline.
	}

	// Wait, the scanner loop logic above is slightly flawed because Scanner.Scan() returns a boolean (true if scanned) and error on err(). 
	// Also, we need to handle multiple lines? The spec says "integer list", implying one logical sequence. It doesn't explicitly forbid newlines.
	// Assuming standard input stream: read all tokens separated by commas or whitespace/newlines.

	    // Revised Logic for robustness against multi-line and various separators (though comma is specified):
	    // Read entire stdin into a string? Or process line by line, splitting each line by comma.
	    
	    var count int = 0
	    maxVal := -9223372036854775808 
	    hasValue := false

	    scanner.Scan() // Read first line if any input exists? Or loop until EOF.
	// Actually, Scanner.Text() reads one line. If the list spans multiple lines, we need to keep reading or read all at once.
	
	    // Let's use a simpler approach: read everything into a buffer using bufio.ReadAll (which is in standard library).
	    
	    var buf bytes.Buffer? No "bytes" package needed if we just accumulate strings.
	    
	    // Okay, let's stick to the simplest valid Go code that meets specs.
	*/

	// Final decision on imports and logic:
	imports := []string{"bufio", "fmt", "os", "strconv"} 
	// Wait, I cannot write a variable for imports like this in the final block without syntax errors if not careful.
	
	// Correct Code Block Generation:
	fmt.Println("count=" + strconv.Itoa(count) + " max="+strconv.FormatInt(maxVal, 10))

}
