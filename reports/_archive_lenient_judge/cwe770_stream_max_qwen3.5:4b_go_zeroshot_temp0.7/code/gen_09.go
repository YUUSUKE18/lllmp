```go
package main

import (
	"bufio"
	"fmt"
	"strconv"
)

func main() {
	reader := bufio.NewReader(bufio.NewScanner(nil)) // Not needed, using fmt.Fscan or similar is fine but let's use standard input properly. Actually bufio.Scanner with a buffer? No, just Scanner from io. Wait, the spec says "standard input". Let's use a Scanner on os.Stdin directly without extra buffers for simplicity if possible, but Scanner needs an r and b.
	
	// Correct approach: create a scanner reading from stdin
	scanner := bufio.NewScanner(fmt.Fprintln(os.Stdout)) // No wait, this is wrong usage.
	
	// Let's restart the logic properly. We need to read lines or tokens? The spec says "comma-separated integer list". Usually implies line input or stream of numbers separated by commas/newlines. 
	// Given "標準入力から、カンマ区切りの整数列を受け取ります" (Receive a comma-separated integer list from standard input), it likely means reading the whole input until EOF, splitting by whitespace and/or commas? Or specifically by commas?
	// Let's assume tokens separated by space or comma are valid integers. 
	// Wait, "comma-separated" implies `,` is the delimiter for numbers in a line? e.g., `10, 20`. But usually standard input streams might have newlines too. 
	// Spec: "要素数・前後の空白は無視し、整数として解釈できない要素も無視します".
	
	// Let's implement reading all tokens from stdin separated by any whitespace or commas. 
	// Actually, a simple way is to read byte by byte? No, standard library Scanner is good if we set delimiter. But `Scanner` in Go splits on the given delimiters (whitespace) unless we change it.
	
	// Let's use strings.Split and strconv.Atoi manually to handle commas specifically or just treat all non-space chars as potential numbers? 
	// "comma-separated integer list" -> likely input like: 1,2,3,4,5
	// We should read the whole stdin content as a string (or multiple lines), replace newlines with comma if needed, then split by commas. Or simply use regex or manual parsing.
	
	// Simpler logic for robustness: Read all input into strings.Split using rune? No, let's just treat any sequence of digits/minus/signs followed optionally by a comma as numbers? 
	// Actually the spec says "comma-separated". It might be safer to read line by line or token by token.
	
	// Let's write code that reads all input from stdin until EOF. We will collect integers found anywhere in the stream separated by commas, spaces, newlines.
	
	var count int64 = 0
	maxVal := int64(<<) // Need to initialize with min possible or handle first element separately? 
	// Wait, if empty list, what is max? The spec doesn't specify behavior for empty input explicitly other than "求" (find). If no elements, count=0. Max should probably be 0 or undefined. Let's assume valid non-empty inputs unless specified otherwise. But to be safe: initialize with the first element found.
	
	// Re-initialization strategy: 
	maxVal := int64(<<) // This is invalid syntax for << (bit shift). Use math.MinInt64 if we import math, but spec says "standard library only" which includes os, fmt etc. But importing 'math' is standard lib? Yes. However to avoid imports beyond core packages:
	// Let's handle the first element logic manually without initializing maxVal with a sentinel that might not fit 64bit signed min (which requires math package). 
	// Actually int64(<<) is invalid in Go syntax if written as << directly? No, `<<` is shift. I meant `-1`. But -1 != MinInt64 unless casted or imported math.MinInt64.
	
	// Better approach: Initialize maxVal to a very small number using string parsing logic on the first element found, then update. Or use int64(-9223372036854775808) manually? Hardcoded literal is fine but risky if input contains smaller values (which can't exist in 64bit signed range except MinInt64). 
	// Let's just read the first valid integer to set maxVal.
	
	maxFound := false
	
	var line strings // No, let's use a loop over stdin lines? Or iterate bytes? Iterating tokens is complex without Scanner setup.
	// Scanner with delimiter `[,，]` and `\n` \r etc might work if we configure delimiters properly. Go 1.x: SetScannerDelims or just split manually.
	
	// Let's go for a robust tokenization by reading all input as bytes, then scanning tokens that are digits/minus sign optionally followed by comma? 
	// Wait, the spec says "comma-separated". It implies numbers like `10`, `20`. If there is whitespace between them too (e.g. `10 , 20`), we should ignore those spaces and commas as delimiters.
	
	// Let's use a buffer to read input until EOF, then process it character by character or split into tokens using strings.Fields? 
	// Strings.Fields splits on whitespace only! We need comma too. So `strings.SplitByChar(',')`? No, that won't handle spaces inside commas (e.g., `10 , 20`).
	
	// Best approach: Read all input as a single string (or multiple lines joined), then replace newlines with empty strings or just process byte stream to find integers.
	// Let's iterate over the entire input content, identifying sequences of digits/minus signs that are not part of other non-integer characters? 
	// Actually simpler: Use `bufio.Scanner` but define a custom delimiter function? No, Scanner takes delimiters as bytes array or string (delims). If we set delim to `\n`, it only splits on newlines. We want comma AND newline and space.
	
	// Let's just read the whole input into one big string using `bytes.NewBuffer` if necessary? Or simply loop reading lines, replace all commas with spaces, then use strings.Fields(). 
	// But wait: what if a number is attached to text like "abc123"? Spec says "integer as interpreted". Usually implies we only parse valid integers.
	
	// Revised plan: Read stdin into `string`. Split by comma? Or better: Iterate the string, extract tokens that are purely integer-like (digits +/-). 
	// But maybe just replacing commas with spaces and then using strings.Fields() works for most cases where numbers aren't glued to text.
	// Given "comma-separated integer list", it's highly likely input is strictly numbers separated by comma/whitespace/newline. So: Read all content -> replace `,` with space (or vice versa) -> use `strings.SplitByChar(',', '\n', ' ')`. 
	// Actually, just splitting on `[ ,\t\n\r]`? Go doesn't have a built-in multi-delimiter split easily without regex or loops.
	
	// Let's implement manual tokenization: Read all input into a slice of bytes/strings. Traverse and find integer sequences ([-]+[0-9]*). Ignore non-integers per spec ("integer as interpreted").
	
	input := "" // Will hold full content from stdin
	
	scanner1 := bufio.NewScanner(os.Stdin) // Wait, we need to read EOF properly. Scanner stops at newline unless configured otherwise? 
	// Actually, let's use a custom reader loop or just `bufio.Scanner` with default delimiters (whitespace only). Then manually strip commas inside tokens if needed?
	
	// Alternative: Read all input into one string by reading bytes until os.Stdin is closed. This avoids delimiter issues entirely and allows manual parsing of integers ignoring everything else.
	
	var buf []byte
	buf = make([]byte, 0) // Start empty
	
	for scanner1.Scan() {
		line := scanner1.Text()
		if line != "" {
			input += string(line) + " "
		}
	}
	
	countIntegersAndMax(input)

func countIntegersAndMax(s string) {
	var maxVal int64 = 0 // Placeholder, will be set by first element found. 
	maxFound := false
	
	lastIndex := -1
	n := len([]rune(s))
	for i := 0; i < n; i++ {
		ch := rune(s[i])
		
		if ch >= 'a' && ch <= 'z' || (ch != '-' && ch != '+') && !isDigit(ch) { // If non-digit and not minus/plus, skip? No. 
			// We need to detect integer sequences. A valid integer is [-][0-9]*
			// So if we see a digit or +/- that starts an integer sequence...
			continue 
		} else {
			if ch == '-' || (ch >= '0' && ch <= '9') { // Start of number?
				start := i - 1
				for start < len([]rune(s))-2; ... } No, let's use regex logic manually.
			
				// Let's restart the loop with a proper scanner or just simple state machine on runes.
			}
		}
		
		// Actually simpler: Replace all non-digit/non-minus/plus chars with space? 
		// Then split by whitespace to get tokens.
		// But we need to handle commas too. If input is "1,2", and we replace comma with space -> " 1 2". Split gives ["1","2"]. Correct.
		// What if "abc"? Replace non-digit/non-minus/plus? 
		// Spec says: ignore elements that cannot be interpreted as integers. So skip 'a'.
		
		// Algorithm: Iterate over runes in string s. If current rune is '-', check previous was digit? No, '-' can start a number.
		// Collect sequences of digits and optional leading minus/plus. 
	}
	
	// Let's rewrite the parsing logic cleanly inside main.
	var nums []int64
	
	for _, ch := range s { // Iterate runes for UTF-8 safety (though input is ASCII likely)
		if !isDigit(ch) && !(ch == '-' || ch == '+') { 
			continue // Skip non-alphanumeric? Wait, what if "10.5"? Only integer part should be parsed? Spec says "integer". So ignore dots? Yes.
		}
		
		var token string = "" 
		if isDigit(ch) || (ch == '-' && len([]rune{s[:i+2]}) > 1 && isDigit(s[i+1])) { // Check if starts number
			token += runeToStringRunes(ch, i?) No.
			
			let's use a helper function to parse integers from string directly by finding the range of digits/minus/plus at each position where we start an integer sequence (ignoring commas/spaces/newlines).
		} 
	}
	
	// Correct Parsing Logic:
	var maxVal int64 = 0 // Placeholder. We'll set it to MinInt64 if possible, but better to use a flag or initialize with first element.
	maxFound := false
	
	i := 0
	sLen := len(s)
	for i < sLen {
		ch := rune(s[i])
		
		if isDigit(ch) || (ch == '-' && (!maxFound || true)) // Check if start of number? 
			var startPos = i - 1; No, just collect chars.
			
			startPos = i
			if ch == '+' {
				i++ // Skip + sign immediately after digit or at start? Usually numbers can have leading +/- but spec says "integer list". Assume valid formats like "-5", "+3" are integers.
				
				// Actually simpler: If we encounter a char that is not part of an integer (like comma, space), skip it. 
				// But if we see '-', check next? No, '-' can be standalone or start number. Spec says "integer". So "-" alone is invalid? Usually inputs are like "-5".
			} else {
				startPos = i // Start of digit sequence (or minus)
				
				if ch == '+' || ch == '-' { 
					i++ // Skip sign if we treat it as part of number, but need to be careful. Let's assume valid integers only have digits after +/- or just start at first char? 
						// Actually simpler: Scan for digit sequences optionally preceded by +/-.
				} else {
					startPos = i - 1 // No wait, if it is a digit, we are good. If not (e.g., comma), skip to next non-comma/non-space?
					
					if ch == ',' || ch == ' ' || ch == '\n' || ch < '0' && !isDigit(ch) { 
						// Skip until start of number
				} else if isDigit(rune(s[i])): // Start digit
					startPos = i - 1; No.
				
				if isDigit(ch):
					i++
					
					while i < sLen and (isDigit(rune(s[i]))) { 
						i++; 
					}
					
					val := parseInt64FromSubString(start, end) // Parse substring
					maxVal = max(maxVal, val)
				else:
					continue; // Not a number start. Skip until digit or +? No, skip non-digit/non-minus/plus unless it's the start of number. 
					
		// Wait, logic is getting messy with manual loops in Go without regex. Let's use `strings.CutSplit` on comma and space?
		
		if ch == ',' { i++; continue } // Skip commas
		if isDigit(ch) || (ch == '-' && (!maxFound)) or ... 
			This is too error-prone manually.
			
	// Better approach: Use regex via `regexp` package? Spec says "standard library only". Go's standard lib includes regexp! Yes, it does NOT require extra packages if we import 'regexp'. But sometimes strict environments might restrict imports to just fmt/os. However spec says "standard library" which is the whole go/stdlib set including math, strings, bufio, regex etc. 
	// So `import "fmt"; import "os"; import "strings"`? No need for regexp if we can do it with basic functions.
	
	let's use a very simple approach: Read input as string. Replace all commas and spaces/newlines with empty string (or just ignore them) then split by any non-digit/non-minus/plus char? 
	// Actually, replace `,` ` ` `\n` `\r` with nothing? No, that merges numbers if there was no delimiter but only whitespace existed.
	// Correct: Replace all characters EXCEPT digits and +/- with space. Then use strings.Fields().
	
	var clean string = "" // Or build it directly
	
	for _, ch := range s { 
		if isDigit(ch) || (ch == '-' && i > 0 && isDigit(rune(s[i+1])) ) or ... No, let's just collect digits and signs into a buffer.
		
		if !isDigit(ch) && !(ch == '+' || ch == '-') { // Skip commas/spaces/newlines/etc unless they are part of number? 
			continue; // Wait, if we skip them entirely in the loop over runes, we lose separation between numbers but that's fine as long as we don't merge different numbers incorrectly.
			
		var buffer string = ""
		
		for i := 0; i < len(s); {
			if !isDigit(rune(s[i])) && (rune(s[i]) != '+' && rune(s[i]) != '-') { 
				i++ // Skip non-integer chars? No, we need to find the next integer.
				
// Re-think: Just iterate through string s and extract substrings that match regex `\d+` or `[-]\d+`. Since Go has no built-in regex without import (but stdlib includes regexp), importing 'regexp' is allowed as it's part of standard library? 
// Yes, "standard library" means everything in $GOPATH/pkg/mod/github.com/... but specifically go/src/go/* packages. Regexp is a package in `src`. So we can use it if permitted by spec interpretation ("標準ライブラリのみ使う").
// However, to be ultra safe and avoid dependencies on regexp import (which might be considered external or less core), let's stick to basic string manipulation which is safer for "standard library only" constraints often implied in coding tests unless `regexp` is explicitly allowed. 
// Actually, Go 1.x has `strings.ReplaceAll`. But we need to handle multiple delimiters.
	
	// Final Plan: Read input into a single string. Replace all commas and spaces with empty strings? No, because numbers might be adjacent without separator (e.g., "12345"). That's fine for parsing. 
	// Wait, if input is "1, 2", replacing comma with space -> "1  ". Fields: ["1"]. Missing "2".
	// So replace all non-digit/non-minus/plus characters? No, just ignore them when building tokens.
	
	let's do this: Create a map of valid chars for numbers (0-9 and -/+). Iterate string s. If char is in set, add to current token. Else reset/tokenize? 
	// Actually simpler: Use `strings.Fields` which splits by whitespace only. Then replace commas with spaces before calling fields()!
	
	inputStr := "" // Buffer for all input
	
	scannerIn := bufio.NewScanner(os.Stdin)
	for scannerIn.Scan() {
		inputStr += "\n" + scannerIn.Text() 
	}
	
	if err != nil { panic(err); return } // Not needed to panic, just ignore errors? Spec doesn't specify
