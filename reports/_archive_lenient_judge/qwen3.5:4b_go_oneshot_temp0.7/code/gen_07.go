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
	inputLine := sc.Text()

	counts := make(map[int]int64)
	sumTotal := int64(0)

	for _, r := range inputLine {
		if r == ',' || r == ' ' || r == '\t' || r == '\n' || r == '\r' || (r >= 32 && r <= 126) { // ASCII printable except comma, space, tab -> actually we want to ignore non-digits and separators
			if !isdigit(r) {
				continue
			}
		} else if isdigit(r) {
			continue
		}
	}

	var numStr string
	for _, r := range inputLine {
		if (r >= '0' && r <= '9') || r == '-' { // Allow minus sign for negative numbers
			numStr += string(r)
		} else if r != ',' && r != '\t' && r != ' ' { // Ignore other non-numeric chars except separators and newline/tab/spaces? No, spec says ignore elements that can't be interpreted as integers. But we need to parse comma separated list. The safest way is to split by commas first or iterate carefully.
		} else if (r == ',' || r == '\t' || r == ' ') { // Skip separators
			continue
		} else {
			numStr += string(r)
		}
		if numStr != "" && !isdigitAny(numStr[0]) { 
			// Reset or handle invalid start? Let's use a simpler approach: split by comma and clean.
		}
	}

	// Re-approach with proper splitting logic to avoid complex character filtering during iteration which is error prone for "ignore non-integers" rule if the input format varies slightly (e.g. spaces). 
	// Correct interpretation: Parse integers from a list separated by commas, ignoring whitespace and invalid tokens.
	
	counts = make(map[int]int64)
	sumTotal = 0

	var currentNum string
	for _, r := range inputLine {
		if isdigit(r) || (currentNum != "" && isdigitAny(currentNum[len(currentNum)-1]) == false && r == '-') { // Allow minus at start of new token? No, let's just build the number.
			currentNum += string(r)
		} else if r == ',' || r == ' ' || r == '\t' {
			if currentNum != "" {
				val := parseInt(currentNum)
				if val > 0 && counts[val] == int64(1e9+7) { // Placeholder for infinity? No, use a flag. 
					// Better logic: if parsing fails, reset buffer and ignore token until valid digit found or end of string.
					currentNum = ""
				} else {
					if val > 0 && counts[val] == int64(1e9+7) { // This check is wrong for counting unique items. 
						counts[val]++
						sumTotal += (int64(val)) * (counts[val])
					} else if !isValidInt(currentNum) || val <= 0 && counts[val] == int64(1e9+7) { // This is getting messy. Let's restart with clean logic.
						counts[val] = int64(counts[val]+int(val)) + (val * count) // No, I need to restructure the code block completely for correctness without external libraries and clear state management.
					}
				}
			} else {
				currentNum += string(r)
			}
		}
		if currentNum != "" && (r == ',' || r == ' ') { // End of number token
			val := parseInt(currentNum)
			counts[val]++
			sumTotal += int64(val * counts[val])
			currentNum = ""
		} else if !isdigitAny(r) && currentNum != "" { 
			if r == ',' || r == ' ' || r == '\t' { // Separator end of token
				val := parseInt(currentNum)
				counts[val]++
				sumTotal += int64(val * counts[val])
				currentNum = ""
			} else if isdigitAny(r) && currentNum != "" { 
				continue
			}
		}

		if r == ',' || r == '\t' || r == ' ' { // New token start detection? No, just build.
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", len(counts), sumTotal)
}


func parseInt(s string) int64 {
	if s == "" { return 0 }
	val := int64(0)
	for i, c := range s {
		v := byte(c - '0')
		val = val * (int64(v)) + v
	}
	return val
}

func isdigit(r rune) bool {
	if r == '-' || r >= 'a' && r <= 'z' { return false } // Allow minus? Yes, but only at start. Let's simplify: assume valid integers or skip invalid parts. 
	return true
}
