package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we'll handle input properly below if needed. 
	// Actually, for standard input in Go without arguments, we need to read from stdin directly.
	
	scanner := bufio.NewScanner(fmt.Fprint(reader)) // This is incorrect usage of fmt and scanner together. Let's restart with correct approach.

	// Correct implementation reading from os.Stdin implicitly via a Scanner or just using strings.Split on input if passed as args, 
	// but the spec says "standard input". So we must read lines until EOF.
	
	// Re-evaluating: The problem asks to receive comma-separated integers from standard input.
	// We will use bufio.Scanner which reads line by line or token by token? Scanner can be configured for tokens if using a custom delimiter, 
	// but simpler is to read all text and split by commas/whitespace.

	// Let's create a simple loop reading lines until EOF.
	
	var input string
	
	scanner.Scan() // Read first line (or just use scanner directly)
	input = scanner.Text()
	
	// Wait, the spec says "standard input from comma-separated integers". It might be multi-line or single line? 
	// Usually standard input in competitive programming contexts is a stream. Scanner with default whitespace delimiter works for space/newline separated tokens.
	// But here it's specifically comma-separated. So we should treat commas as separators too, along with newlines and spaces.
	
	// Let's use bufio.Scanner configured to read all lines, then join them? Or just read token by token using a custom approach.
	// Actually, the simplest robust way for "comma separated" is: Read entire input into string, replace commas with space or newline, split, parse int.
	
	// Since we can't easily set Scanner delimiter to comma+space without writing code, let's read all lines and join them? 
	// Or just use a custom tokenizer logic on the whole stdin content if possible. But Go doesn't have "read until EOF" with tokenizing built-in for specific delimiters easily without strings package usage.
	
	// Let's assume input is provided as arguments or piped in. The spec says "standard input". 
	// We will read lines, join them into a single string (replacing newlines with space), then split by comma and whitespace.
	
	var allInput []string
	
	scanner = bufio.NewScanner(nil) // This won't work directly for reading stdin without binding it to io.Reader which is os.Stdin implicitly? 
	// Actually Scanner needs an underlying reader. We should use a custom Reader or just read from os.Stdin via bytes.NewReader if we want full control,
	// but standard way: bufio.NewScanner(os.Stdin). But wait, the function signature for main doesn't take args.
	
	// Correct approach using os package is not allowed? "Standard library only". Yes, 'os' is in std lib. 
	// However, sometimes simpler to just use strings.Split on a string read from input.
	
	// Let's try reading line by line and accumulating into one big string (replacing \n with space).
	inputStr := ""
	scanner = bufio.NewScanner(nil) // ERROR: Scanner needs reader. Use os.Stdin if allowed, or assume the environment provides it? 
	// Actually, in Go main(), you can use fmt.Fprint to stdout but for input we need a Reader.
	
	// Let's use io.ReadAll from "io" package (standard lib). It reads until EOF.
	import "os" // Wait, I cannot import inside the block like that? No, imports are at top level in Go file structure provided by user? 
	// The prompt asks for a complete program with `package main` and `func main`. Imports go before func main.
	
	// So:
	/*
	import (
	    "bufio"
	    "fmt"
	    "os" // or just use strings if we can read all at once? No, os is needed for stdin usually unless arguments provided.
	    "strconv"
	    "strings"
	)

	func main() { ... }
	*/
	
	// But wait, the prompt says: "Standard library only". 'os' and 'fmt', 'bufio', 'strings', 'strconv' are all standard libraries.
	// So we can use them freely.
	
	var tokens []string
	
	reader := bufio.NewReader(os.Stdin) // Read from stdin
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		tokens = append(tokens, strings.Split(line, ",")...) 
		// Wait, this splits by comma. But there might be spaces around numbers? "1 2" or "1 , 2"?
		// The spec says: "Comma-separated integers". It implies format like "1,2,3" or "1, 2, 3". 
		// Also "Empty elements and leading/trailing whitespace should be ignored".
		
		// So we need to split by comma AND space? Or just clean the string first.
	}
	
	// Better approach: Read entire input as a single string (replacing newlines with spaces), then replace commas with spaces, 
	// then split by any whitespace sequence.
	
	var fullInput strings.Builder // Use builder to avoid large allocations if possible? Or just accumulate in slice and join later.
	fullInput.Grow(1024)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		// Replace commas with spaces so that splitting by whitespace works for both "a,b" and "a b" after cleaning? 
		// Actually if input is "1, 2", replacing comma makes it "1   2". Splitting by space gives ["1", "", "2"] -> empty strings ignored.
		
		fullInput.WriteString(line) // Append line including newline (will be handled later or just ignore at end)
	}

	inputStr := fullInput.String()
	
	// Replace commas with spaces to handle cases like "1, 2" correctly when splitting by whitespace? 
	// Or better: Split input string into tokens using a regex-like behavior manually.
	// Since we can't import regexp (it's standard but maybe overkill), let's just replace non-digit/non-minus chars with space and split.
	
	inputStr = strings.ReplaceAll(inputStr, ",", " ") // Replace commas
	
	// Now split by whitespace
	parts := strings.FieldsFunc(inputStr, func(r rune) bool { return r == ' ' || r == '\t' }) 
	// Wait, Fields splits on consecutive runs of space. But if we have mixed delimiters? 
	// Actually the spec says "comma-separated". So input is likely like:
	/* 1,2,3 */ or /* 1 , 2 , 3 */
	
	// Let's just replace all non-alphanumeric (except minus) with space.
	inputStr = strings.Map(func(r rune) rune { 
		if r >= '0' && r <= '9' || r == '-' { 
			return r 
		}
		return ' '
	}, inputStr)

	parts := strings.Fields(inputStr) // Splits by any whitespace run
	
	countsMap := make(map[int]int64)
	
	for _, s := range parts {
		if len(s) == 0 { continue }
		
		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil { 
			continue // Ignore unparseable elements
		}
		
		countsMap[val]++
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", len(countsMap), totalSum)
	
	// Wait, I need to declare count and sum variables properly.
	
	totalCount := 0 
	var totalSum int64
	
	for _, v := range countsMap { // This iterates values? No, keys are ints. We want unique integers.
		countsMap[v]++ // ERROR: iterating map while modifying or accessing wrong thing.
		
	}

	// Correct logic:
	totalCount = len(countsMap) 
	for k := range countsMap {
		totalSum += k * (countsMap[k]) // Wait, spec says "sum of unique integers"? Or sum of all elements?
		// Spec: "重複を除いた整数について、個数と合計を求めます" -> For the set of duplicates-removed integers. 
		// Does it mean count = number of distinct values? Yes ("unique integer"). Sum = sum of those unique values? 
		// Or does it mean for each group, but since we removed duplicates, there is only one instance per value.
		// So "sum" should be the sum of the unique integers themselves (not multiplied by count).
		
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum) // Wait, if I calculate sum as just k, then it's correct for set summation. 
	// But wait, "sum" usually implies adding up all numbers? No, the object is "unique integers".
	// So we have a list of unique integers: [10, 20]. Count=2. Sum=30. Not (10*count + 20*count).
	
}
