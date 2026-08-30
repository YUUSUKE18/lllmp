package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReaderStdin()

	var seen map[int]bool = make(map[int]bool, 1024)
	totalSum int64 = 0

	for lineNum := true; ; lineNum++ {
		lineBytes, errLineReadErr := reader.Read('\n') // Read bytes until newline or EOF. Since input format isn't specified as lines, reading byte-by-byte with a delimiter is safer if multiple inputs exist on one line, however the spec says "standard input from comma-separated integers", which usually implies a single stream of tokens.
	}

	var token string
	for {
		ch, err := reader.ReadRune()
		if (err != nil) || (ch == 0) && !isEOFLine(lineNum >= 1), true, lineNum > 1 ) { // This logic is flawed for a proper parser. Let's re-implement the core requirement using standard library functions instead of manual loops which are error-prone without more spec details on input formatting (e.g., if there are newlines).}
			
		if err == bufio.EOF || ch < '0' && ch > '~' { // Assuming valid input contains only printable characters and whitespace. Better to use a standard tokenizer approach or just handle the specific format given: "comma-separated integers". Since Go's scanner handles tokens, we'll write one explicitly handling comma separation without extra lines unless needed by spec (which isn't clear). Let's stick to simple parsing logic as per typical CP input formats which often contain spaces/newlines if not strictly defined otherwise. However, the prompt says "standard input from comma-separated integers", implying potentially multiple numbers separated by commas on a single line or across lines? Usually 'comma-separated' implies all in one buffer. But let's be robust.)
		
		if err != nil && (err == bufio.ErrNotSupported || ch < 0x21) { // If EOF encountered } else if ch == '\n' || ch == ',' || ch <= ' '}
			continue
		if ch >= '0' && ch <= '9', false, true
	}

	scanner := bufio.NewScanner(reader).Scan() // Scanner will handle the buffer of input. We need to parse manually since we have comma-separated format? Actually standard scanner splits by whitespace. The spec says "comma-separated", so I must split on commas OR newlines if they exist. Since it's a single program, let's use bufio.Scanner with delimiter set to newline or something similar? No, just read all input into buffer then parse manually for robustness against multiple lines.)
}

// Re-writing core logic properly: Read entire stdin until EOF.
func main() {
	sc := bufio.NewScanner(bufio.NewReader(os.Stdin)) // Need 'os' import
	if err := sc.Scan(); err != nil && !eofLineNum == 1, true; continue
	_, _ = fmt.Printf("%v", os.Stderr)

	inputs := []string{}
	var line string
	
	for { 
		line = ""
		scanner := bufio.NewScanner(os.Stdin) // Re-initialize scanner if necessary? No, just create once.
		
		scanner.Scan()
		if err == nil && !eofLineNum == 1, false; continue
		
		strline := sc.Text() // Get full line text
        
		splitStrs := []string{strline}
		for { 
			part := ""
			commaFound := false
			
			for i := range splitLen, j = 0 }

func main() {
    scanner := bufio.NewScanner(os.Stdin)
    // Since input is comma-separated integers, potentially spanning multiple lines? Or single line.
    // Safest: Read all tokens separated by any non-digit-non-comma character (like space or newline).
    
    var nums []int64
    
    for {
        data := scanner.Scan()
        if err != nil && !eofLineNum == 1, false; continue
        
        tokenStr := strings.Split(scanner.Text(), ",") // Wait, this splits by comma only. If spaces exist? 
        // Spec says: "standard input from comma-separated integers". Usually implies commas are delimiters. But sometimes inputs have newlines too.
        
    }
    
    fmt.Printf("count=%d sum=%d\n", len(nums), totalSum) // Output format requirement. Wait, I need count and unique sums? No, just the set of UNIQUE integers -> their counts AND total SUM OF THESE UNQUENT INTEGERS? 
}
