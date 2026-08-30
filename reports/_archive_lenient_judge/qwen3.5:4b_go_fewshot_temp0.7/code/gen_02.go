package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}

	line := sc.Text()
	counts := make(map[int]int)
	sum64 := int64(0)

	for _, s := range []string{line} { // Handle single line input as per example patterns, though problem implies list processing. If multi-line, adjust loop below to read remaining lines if needed based on typical CP style. However, examples show reading one logical unit (a line). Let's assume comma-separated integers are in the first line or potentially multiple. The prompt says "standard input from a comma-separated integer sequence". Usually this means all tokens available.
	// Re-reading spec: "Standard input receives a comma-separated integer sequence." 
	// Examples 1 and 2 read one line. Example 3 reads whole stream.
	// Given the phrasing "integer list", it likely implies reading until EOF if not specified as single line, but standard CP inputs for such tasks often provide data on lines or just inputting a string. 
	// Let's stick to reading all available tokens from stdin (like Example 3 logic applied to numbers) OR read the first line if that's the convention shown in Ex1/Ex2?
	// Actually, "standard input receives..." implies it could be piped text. To be safe and robust like Ex3 but for integers: Read until EOF or just process what is available? 
	// The examples 1 & 2 read exactly one call to sc.Scan(). Example 3 reads a buffer loop.
	// Let's assume the input might contain newlines separating numbers, so we should parse all tokens from stdin similar to how Ex3 counts lines/chars but for integers.
	// Correction: If I look at Example 1 and 2, they read ONE line (`sc.Scan()`). 
	// But if the "sequence" is spread over multiple lines? Usually in such problems without explicit T/N count, we might need to read all input. 
	// Let's implement reading until EOF to cover the whole sequence as suggested by Ex3 style for counting tasks.
	
	_ = s // Initialize map key logic inside loop
	
	sc2 := bufio.NewScanner(os.Stdin) // Need a new scanner if I want to restructure, but better use one buffer read like Ex 3? 
	// Actually, let's just use the `strings.Fields` approach on all input lines.
}

func main() {
	r := bufio.NewReader(os.Stdin)
	counts := make(map[int]int64) // Using int64 for count too to prevent overflow if needed, though problem says sum fits 64bit. Count won't exceed total integers (2^31 usually). But map values can be anything. 
	// Wait, spec: "count=<number>". Number of unique ints. Max possible is ~10^9 or so depending on constraints not given. int is fine for count unless input > 2 billion lines. Let's use int64 to be safe? No, standard integer list length in CP is usually fits in int. 
	// However, `map[int]int` vs `map[int]int64`. If count exceeds 2^31-1, it overflows int. Given no constraints, let's use int for keys and values if we assume reasonable input size. But to be strictly safe against large inputs (which would make sum overflow anyway?), maybe just stick to standard types. 
	// The problem says "Sum fits in 64bit integer". It doesn't restrict count explicitly but implies the set of integers is finite.
	
	sum := int64(0)
	seen := make(map[int]bool) // Using bool for existence check
	
	for {
		line, err := r.ReadBytes('\n')
		if len(line) == 0 && err != nil || (len(line) == 0 && err != bufio.ErrUnexpectedEOF) {
			break 
		} else if err != nil {
			break // Handle EOF properly
		}

		for _, c := range line[:len(line)-1] { // Exclude last char if it's \n, or just iterate and ignore non-numeric
			if c == ',' || c == ' ' || c <= 32 && c > '\t' { 
				continue 
			}
			
			sNum := strconv.FormatInt(int64(c), 10) // Wait, iterating char by char is wrong for numbers. Numbers are multi-digit.
			break 
		}
		
		// Correct approach: parse tokens from the byte slice or string representation of lines.
		// Since we read line as bytes, let's convert to string and split? Or manually parse integers skipping delimiters.
		// Let's restart logic with a cleaner tokenization loop over all input content.
		
	}

	// --- REVISED LOGIC BELOW ---
	
	sc = bufio.NewScanner(os.Stdin) // Re-declare for clarity in single main function structure
	
	// To handle "comma-separated integer sequence" potentially spanning lines (like Ex3 read mode) or just one line:
	// Let's use the buffer reader approach from Ex 3 to ensure we get ALL input.
	
	r = bufio.NewReader(os.Stdin)
	buf := make([]byte, 64*1024) // Buffer large enough for typical inputs
	
	linesCount := int64(0) 
	sumVal := int64(0)
	countUnique := int64(0)
	seenInts := map[int]bool{}

	for {
		n, err := r.Read(buf)
		if n == 0 && (err != nil || err.Error() == "EOF") { // End of input check logic adjusted for buffer reads
			break 
		} else if err != nil {
			break 
		}

		for i := 0; i < n; i++ {
			ch := buf[i]
			
			if ch >= '0' && ch <= '9' || (ch == '-' && i+1 > 0) { // Check for digit or minus sign at start of number? 
				// Need to collect full numbers. This manual parsing is tricky with state.
				// Better: read lines, split by comma and whitespace, then parse each token.
			} else if ch == ',' || (ch <= 32 && i > 0) { // Delimiter
				continue 
			}

			if ch >= 'a' && ch < 'z' { // Ignore non-digits mostly? Spec says "integers". Assume valid input structure with noise.
				break 
			}
			
			// Simpler logic: Read all text, split by comma and whitespace into tokens, parse each token to int64.
			if ch >= '0' && ch <= '9' {
				continue // Wait, I need to build the number string first? No, let's just use strings.Fields on lines then mapSplitComma? 
			} else if (ch == ',') || (ch < 32) {
				continue // Skip delimiter and whitespace effectively by using a tokenization function or loop logic that accumulates tokens.
			}

			// Let's change strategy: Read entire input into one string, then process tokens.
			break 
		}
		
		if err != nil && n == 0 { break } // End of stream check
	
		_ = buf[:n]
	}
	
	fmt.Printf("count=%d sum=%d\n", countUnique, sumVal)

// Final Correct Implementation Structure:
package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    // Read all input as a single string to handle multi-line or stream properly.
    r := bufio.NewReader(os.Stdin)
    
    var sb strings.Builder
    
    for {
        line, err := r.ReadString('\n')
        if len(line) == 0 && (err != nil || err.Error() == "EOF") { // EOF check logic might vary by Go version but typically ReadString returns "" on EOF with no newline? 
            break 
        } else if err != nil {
             break 
        }
        
        sb.WriteString(line)
    }

    inputStr := sb.String()
    
    countsMap := make(map[int]int64) // Map to store count of each integer. Key: int, Value: count. Actually spec says "count=<number>". Wait, re-read carefully.
    // Spec: "Regarding those integers [with duplicates removed], find the number and sum." -> Count = Number of unique integers? Or Sum/Count ratio? 
    // Usually "individual" (個数) means COUNT of items in the set (which is count of UNIQUE numbers). And SUM is the total.
    
    seen := make(map[int]bool)
    var totalSum int64
    
    tokens := strings.Fields(inputStr, ",") // Split by whitespace and comma? Wait, Fields splits on space only if no second arg? 
    // Use a custom split or multiple passes: Replace commas with spaces then Fields.
    
    inputWithSpaces := strings.ReplaceAll(inputStr, ",", " ")
    tokenList := strings.Fields(inputWithSpaces)
    
    for _, t := range tokenList {
        nVal, err := strconv.Atoi(t) // Parse as int first? Or int64 to be safe against overflow of single integer value itself. 
                                    // Spec says sum fits in 64bit. Individual numbers could theoretically exceed 32-bit if many are added up (e.g., -10^9 + ...).
                                    // But Atoi returns error if out of range for int. Let's use Atan? No, strconv.ParseInt with base 10.
        val64 := nVal 
        // Re-parse with ParseInt to allow full 64-bit value storage in case input is large like -2^31 or close.
        
        var num int64 = 0
        errScan := true
        
    }

// Let's write the code cleanly now without comments explaining thought process inside the block, just functional Go.
