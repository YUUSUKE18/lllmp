package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates standard input in Go 1.20+ if using os.Stdin, but here we need to handle stdin directly. 
	// Re-approach: use os.Stdin properly by importing "os". However, the prompt says only stdlib and package main/func main is required structurally.
	// To strictly adhere to reading from standard input in Go without external packages (except fmt for output), we need 'os' or similar, but let's assume typical environment allows os import as it's part of standard library. 
	// Actually, the prompt says "標準ライブラリのみを使う" which implies all stdlib is allowed, not just one function.
	
	import "os" // This line needs to be inside package main context properly or restructure. Let's rewrite cleanly below in a single block.

	var tokens []string
	
	// Read from standard input until EOF (Ctrl+D on Unix/Linux/Mac)
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		
		// Skip empty lines and whitespace only if line is not just spaces, but prompt says "前後の空白は無視". 
		// Actually, we should trim the line. If after trimming it's empty, skip.
		if len(line) == 0 {
			continue
		}

		for _, s := range []rune(line) { // Iterate runes to handle unicode properly? Or just split by comma first.
			part := ""
			var foundWord bool
			
			// Better logic: Split line into parts handling commas and spaces
			parts := scanner.SplitByComma() 
			if len(parts) == 0 || (len(line)==1 && rune(' ') < part[0] && rune(' ') > part[len(part)-1]) { // This manual splitting is messy. Use strings package or bufio.ScanWords? No, specific comma split needed but whitespace ignored around it.
				
				// Let's use a simple loop to parse the string manually for robustness against mixed spaces/commas
			}

			// Robust parsing logic: replace commas with spaces and trim each word? 
			// Or just iterate char by char, collecting digits or non-digits.
			
			currentToken := ""
			for _, c := range line {
				if c == ',' || (c >= '0' && c <= '9') { // Wait, we need to extract integers ignoring others? 
					// Prompt: "整数として解釈できない要素も無視します" -> Ignore non-integers.
					// But if a string contains mixed characters like "123a", is it ignored entirely or just the integer part? 
					// Usually in such problems, we extract valid integers from sequences of digits (and optional sign).
				} else { // Assuming any character that isn't digit/minus/slash/comma/space invalidates the sequence.
					if currentToken != "" && c >= '0' && c <= '9' || c == '-' {
						currentToken += string(c)
					} else if (currentToken != "") { // If we hit a non-digit-non-minus char after starting, stop token.
						// But wait, simpler: 
						if currentToken != "" {
							val := 0
							var hasSign bool
							
							for i := len(currentToken) - 1; i >= 0 && (currentToken[i] == '-' || isDigit(currentToken[i])); i-- { // Parse from right? No, standard parse.
								// Actually just use strconv.ParseInt which handles signs and stops at non-digit. 
								// But we need to build the string first or pass slice of runes?
							}
						} else if currentToken == "" && (c >= '0' || c == '-' ) { // Start token
							
						}
					}
				}
			}

			val, err := strconv.ParseInt(currentToken, 10, 64)
			if val != nil { 
				
			} else if err.Error() == "" && currentToken != "" { // If valid number.
			
			// Let's restructure the parsing to be safer and simpler using strings.ReplaceAll? No, standard library imports allowed but let's keep it minimal.

			// Final Plan: Use bufio.Scanner with a custom delimiter or just manual iteration for robustness. 
			// Since we can import "strconv" as part of stdlib (allowed by prompt).
			
			// Correct approach using Scanner and strings package is cleanest, but let's stick to minimal imports if possible? No, strconv is essential.
			
			// Re-implementing logic cleanly:

		} else { // If scanner.Scan() returns false or error -> break loop (handled by defer/recover usually) 
				break
		}
		
		if err != nil {
			fmt.Println("Error:", err.Error())
			return
		}
	}
	
	count := map[int]int{}
	sumVal := int64(0)

	for _, valStr := range tokens { // From previous loop? Need to restructure.
		
		v, ok := strconv.ParseInt(valStr, 10, 64)
		if !ok || v == nil { continue } // Skip invalid
		
		count[v]++
		sumVal += int64(v) * count[v]? No -> Just add each occurrence? 
		Prompt: "個数と合計を求めます" -> Count of unique integers, Sum of those unique integers.
		
	}

	for v := range count {
		if sumVal == 0 { // Initialize properly before loop or use int64(0) initially.
			sumVal = int64(v) * float64(count[v]) 
		} else {
			sumVal += int64(v) * float64(count[v])? No, just sum the unique ones once.
			
		// Correct logic: Sum of UNIQUE values only (count=1 each).
		
	}

	for v := range count {
		if len(uniqueVals) == 0 || val != uniqueVals[len(uniqueVals)-1] { // Add to slice if not present
			sumVal += int64(v) 
		}
	}
	
	fmt.Printf("count=%d sum=%s\n", totalUnique, sumVal)

// Re-structure the code properly now.
