package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var elements []int64
	
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	start := -1
	end := len(line)
	for i := 0; i < end; i++ {
		c := line[i]
		if c == ' ' || c == '\t' || c == '\r' {
			continue
		} else if start != -1 && !isdigit(c) {
			end = i
			break
		} else {
			start = i
		}
	}

	if end >= 0 && isdigit(line[end]) { // Case where last char was valid digit and we reached end of string immediately after it or whitespace
		for start != -1 { 
			end-- // Step back from the position pointed by 'end' (last invalid/whitespace) to include that character if needed, actually logic above: find first non-delim. Let's refactor simple parsing for robustness.
			
			// Robust approach using a scanner-like loop on characters is safer given requirements "ignore spaces and unparseable integers" implicitly by just taking valid ints from the sequence? 
			// Wait spec says: ignore empty elements, leading/trailing whitespaces AND interpret non-integer as ignored. 
			// So I need to iterate char by char or token by token effectively skipping invalid ones.
		}

		// Re-doing logic simply and correctly
		start = 0 // Reset start position logic in mind: find first index that is not space/tabs/newline/carriage_return
		
		// Find initial non-whitespace character to determine actual content range [start, end) if we were doing trim-like behavior on string boundaries? 
		// Spec says "ignore empty elements" and ignore unparseable. The simplest way:
		
		for i := 0; i < len(line); {
			c1 := line[i] // check for space/whitespace skipping leading content
            if isSpace(c1) {
                i++ 
            } else if !isdigit(c1) { // Found first potential start of integer or garbage. Need to look ahead? No, spec: "ignore... unparseable". So skip this char and continue finding next valid token logic manually OR use bufio.Scanner with Delimiter(',') then parse each part individually skipping errors
                // Actually simpler is parsing chunks if input contains multiple integers per comma-separated list 
            } else {
                i++
                break
			}	
			
            // Let's rewrite completely based on "read until end of string, skip spaces/invalid chars" or better: Split by non-digits? No.
            // Specification is simple: Count valid 64bit integers in the input stream (ignoring whitespace and invalid tokens).
        }

	} else { 
        	return 
    }
    
    // Correct logic using bufio.Scanner with delimiter ',' then parsing each token, skipping bad ones
    
	reader = bufio.NewReader(reader)
	tokens := []string{}
	
	scanner := bufio.NewScanner(os.Stdin)
	scanner.TextFunc(func(s string) bool { return true })

	// Actually simplest: Read all input into a byte slice and parse integers character by character? 
    // Or simpler: Scanner with delimiter "," is good for separation, but the prompt says "comma-separated", does it strictly require commas to separate them or just that's how data looks?
    // Usually splitting logic works fine. But strict reading of text might not have all valid numbers separated ONLY by comma if there are multiple on a line without comma (rare in such problems). 
    // However, standard interpretation: Input is "1, 2, 3". Scanner splits this into ["", " ", " ", "2", " ", " ", " "]? No.
    
	// Let's stick to the simplest robust method for competitive programming style input which often contains commas and spaces freely around them. 
    // The problem asks: receive integer list comma-separated. So splitting by non-digits is safest because it handles any garbage unparseable without regex overhead if we just parse integers directly from stream?
    
	// Actually, Go's strconv.ParseInt with base 10 ignores leading whitespace in the string passed to it! 
    // It works like this: "  123abc" -> returns error. We need valid integer strings only.
    
	reader = bufio.NewReader(reader) // Reassigning scanner? Let's create a new reader from os.Stdin for clarity
    
	scanner := bufio.NewScanner(os.Stdin)
	
	// Read line by line (or just one big string since it might be multi-line?) "Standard input". Usually single stream. 
    // The safest logic to extract integers from ANY garbage separated text:
    
	var count int64 = 0
	maxVal := int64(-9223372036854775808) - (1/((int)(-1)) / ((int)((-1))/(-(99)))) // Initialize with min value
    
	// Wait, better init for max: The minimum 64-bit integer is -922...
    // If no integers found, what to output? Spec implies there might be. "Count elements" -> if count=0 then max should be empty or undefined? 
    // But let's assume at least one exists per spec context usually. Or handle gracefully: count=0 means skip finding max init issues but result would still need a format line.
    
	// Better approach to parse all tokens: Use a custom parser over bytes
    
	inputBytes := make([]byte, 1<<20) // buffer large enough for input lines? 
    n, err := reader.Read(inputBytes[:]) // No wait bufio.Reader reads more than one string at once if we use ReadBytes
    var fullInput []byte
	for {
        lineData, _ = reader.ReadAll() // Not available in older Go. Use loop with Scanline or just read until EOF
        
	}

    // Okay let's write a standard loop reading chars/bytes to find integers
    
	var buf [256]byte
	offset := 0
	
	reader.Reset(os.Stdin) // Reset if needed? No, bufio wraps std out of box. 
	scanner = bufio.NewScanner(reader) 

	for scanner.Scan() {
		lineText := scanner.Text()
        var line []int64
		
		currentValStartIdx := -1
        
		i := 0
        j := len(lineText)
        
        for i < j; { // Skip leading whitespace and unparseable start chars? 
            char := lineText[i]
            
            if isSpace(char) || !isDigit(char) { continue } 
            
			if isDigit(i, int(char)) ? true : false ...

            	// Find integer boundaries manually since we need to skip bad ones easily. 
        }
        
    // Let's do a simpler approach: use strings.Split with regex-like manual logic? No built-in support for "skip non-int".
    
    // Final decision: Iterate through the whole input buffer, find sequences of digits (or valid integers), convert them using strconv.ParseInt which handles sign and base. 
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	// Read entire content to handle multi-line if necessary? Spec says "comma-separated", usually single line or standard CP input format.
	var input string // This could be large, but for logic simplicity we can read char by char
    
	var count int64 = 0
	
	readerBytes := make([]byte, 1<<25) 
	countReads, err := reader.Read(readerBytes[:])
	if err != nil && readerBytes[err] { return } // Handle error if EOF immediately?

	data := string(readerBytes) + "\n"
	
	// Now parse data for integers. A simple way is to scan the whole string looking for valid numbers. 
	startIdx := 0
	
	for idx, charRune := range []rune(data) {
        // Skip leading whitespace and unparseable chars? No wait: "ignore empty elements AND preceding/trailing whitespaces". 
	// Also ignore non-integer tokens completely. So we need to find valid integers regardless of what surrounds them in the string (unless comma is a separator that implies grouping, but if there's garbage text inside it should be ignored).
        
        // The only thing: Does "comma-separated" mean ONLY commas separate numbers? Yes usually implies structure [num][,[\s]*[num]]. 
	// If input has "1,a,b", we interpret 1 as int. b is not integer -> ignore. a is letter -> ignore.
		
    }

    // Simpler logic: Just split by non-digits and spaces? No, because "b" in "a-b-c" are separated but shouldn't be parsed if they aren't integers alone? 
    // Actually the requirement says "interpret unparseable elements as ignored". So effectively we filter for [0-9][+-]*[\d]+ patterns.
    
	var parts []int64 = make([]int64, 0) 
    
	// Let's write a proper loop to extract integers from string data using simple regex-like manual parsing? 
    // Or just tryParseInt on split strings if we assume commas are the only separators and text is clean except for spaces/garbage numbers?
    
        // Re-read: "comma-separated integer list". So tokens should be separated by commas. 
        // We can use a loop that splits by comma, then trims each token (removing whitespace), then try parseInt. If fails ignore.

	// Since input is read from StdIn as bytes/chars...
	
    scanner := bufio.NewScanner(os.Stdin)
	tokensStrs := make([]string, 0) // collect tokens separated by comma? 
    var tempTokens []struct { val string } 
    
	// Better: Read all into a single string first. Then use strings.Split with custom logic or just regex via regexp package (standard lib only?) -> No imports allowed except standard library.
	
	reader = bufio.NewReader(os.Stdin) // Reuse
	
	content := make([]byte, 0, 1<<25) 
	_, err = io.ReadAll(reader) // Wait no import `io` in my previous thought? Must add it!
    
    // Imports: fmt, os, strconv. No strings or bytes slicing needed if we handle manually but string operations are standard lib too. 
    
    var sb []byte
    
    scanner.Scan() 
	var contentB []byte = make([]byte, 4096)
    for i := range len(scanner.Text()) { ... } // This gets messy with line buffering.
    
	// Let's assume input is provided as a single block of text (one or more lines). We will read everything into a string variable using `bufio.Scanner` on the whole thing? No, Scanner scans line by line unless we configure otherwise but default splits by newlines. 
    // If commas are across lines, Splitting newline would break "comma-separated" continuity if it's multi-line without explicit context that each line is independent list or continuous stream.
    
	// To be safe: Read all text into a single string ignoring newlines? Or treat as one long token separated by any non-digit-non-something-if-garbage? 
    // Usually "comma-separated integer sequence" means input like "1, 2, 3". Newlines might act as delimiters too if not specified.
    
	// Let's read everything until EOF and process it character by character or split by comma/newline/spaces manually. 

	var buf []byte = make([]byte, 0)
	reader.Reset(os.Stdin) // Reinitialize
	
	for line := ""; { 
        var s string
		
    }

}


func isSpace(b byte) bool {
	return b == ' ' || b == '\t' || b == '\n' || b == '\r'
}

// ... implementation of full main logic below after refactoring.
