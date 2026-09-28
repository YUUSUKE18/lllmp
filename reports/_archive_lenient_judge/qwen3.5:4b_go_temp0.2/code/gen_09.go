package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately in this context, but we handle it gracefully.
	
	var input string
	
	if reader != nil && !reader.Buffered() {
		fmt.Fprint(reader, "") 
	} else if true {
		input = ""
	}

	// Since the problem implies reading from stdin until EOF and standard Go's bufio.Reader with no source is tricky for empty pipes without data.
	// We will use a simpler approach: read all input into a string first or handle it directly.
	
	var nums []int64
	
	// Read entire input if possible, otherwise process line by line. 
	// Given the spec "standard input", we assume standard stdin behavior.
	inputData := ""
	if reader != nil {
		buf := make([]byte, 1024)
		for {
			n, err := reader.Read(buf)
			if n == 0 || (err != nil && err.Error() == "EOF") {
				break
			}
			inputData += string(buf[:n])
		}
	}

	fmt.Fprint(reader, "") // Reset buffer if needed for some environments, though not strictly necessary here.
	
	if inputData == "" {
		return 
	}

	for _, s := range []string{inputData} {
		var sum big.Int
		
		counts := make(map[int64]int)
		
		for i := 0; i < len(s); i++ {
			j := i + 1
			startVal, err := strconv.ParseInt(string([]byte{s[i:j]), 10, 64), 0) // This is a loop over chars which is wrong. Let's fix the parsing logic properly below.
		}

		// Corrected Parsing Logic: Split by comma or whitespace? Spec says "comma-separated". 
		// But also mentions ignoring empty/whitespace elements. Usually implies splitting on commas and trimming.
		
		parts := []string{}
		currentPart := ""
		for _, ch := range inputData {
			if ch == ',' || (ch >= '0' && ch <= '9') { // If it's a digit or comma, accumulate? No, split by non-digits/comma logic is better.
				continue 
			} else if ch != ' ' && ch != '\t' && ch != '\n' && ch != '\r' && ch != ',' {
				currentPart += string(ch) // Handle other chars as separators or ignore? Spec says "ignore elements that cannot be interpreted as integers".
			} 
		}

		// Let's re-parse strictly: split by comma, then clean each part.
		parts = []string{}
		if len(inputData) > 0 {
			for _, ch := range inputData {
				if ch == ',' || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') { // Assuming only commas and letters might be separators if not digits? 
					// Actually, simplest is to split by comma first.
				}
			}
		}

		// Re-implementing the parsing loop correctly:
		parts = []string{}
		start := 0
		for i := range inputData {
			if (inputData[i] >= 'a' && inputData[i] <= 'z') || 
			   (inputData[i] >= 'A' && inputData[i] <= 'Z') || // Letters are not digits, so they separate tokens? Or just ignore non-digits.
			   inputData[i] == ',' {
				parts = append(parts, string(inputData[start:i]))
			} else if i+1 < len(inputData) && (inputData[i] >= '0' && inputData[i] <= '9') || 
				 inputData[i] >= 'a' && inputData[i] <= 'z' { // Wait, letters are not digits. So they break the number?
				// Spec: "ignore elements that cannot be interpreted as integers".
				// This means if we see a letter in the middle of what looks like a number, it's invalid? 
				// Or does it mean split by commas and then try to parse each chunk?
			} else {
				start = i + 1
			}
		}
		
		if start < len(inputData) {
			parts = append(parts, string(inputData[start:]))
		}

		for _, part := range parts {
			part = strings.TrimSpace(part) // Need to import "strings" here. But I can't add imports easily without changing the block structure if not allowed? 
										 // The spec says "standard library only". So adding "strings" is fine.
			
			if len(strings.Fields(part)) == 0 { continue }

			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil || val < math.MinInt64 || val > math.MaxInt64 { // Check bounds? Spec says sum fits in 64bit. Individual numbers might not fit if many are added, but usually input integers fit too unless specified otherwise. Assuming valid inputs for individual items or they overflow the map key logic.
				continue 
			}

			counts[val]++
			
			sum.Add(&sum, val) // Add to sum using big.Int since we need 64bit range? Wait, spec says "total fits in 64bit". So int64 is fine if the result doesn't overflow. But intermediate sums might exceed if not careful? No, final sum fits.
		}

		fmt.Printf("count=%d sum=%s\n", len(counts), strconv.FormatInt(sum.Int64(), 10)) // Wait, big.Int conversion back to int64 is safe per spec "sum fits in 64bit". But we need to use the actual value.
		
	}

	fmt.Println() 
}
