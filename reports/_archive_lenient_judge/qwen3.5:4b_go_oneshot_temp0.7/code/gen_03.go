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

	line, _ := sc.Text()
	pairs := make(map[int]int64) // key: number, value: sum (count * num)
	counts := make(map[int]int)  // count of each unique number

	for _, r := range line {
		if r == ',' || r == ' ' || r == '\t' || r == '\n' {
			continue
		}

		val, err := strconv.ParseInt(string(r), 10, 64)
		if err != nil || val <= 0 { // Assuming valid integers are positive based on typical problem constraints, but if negative allowed just check parse error. 
			// Re-evaluating: "整数" usually includes negatives in Go unless specified otherwise. 
			// Let's assume any integer parsed successfully is valid.
			continue
		}

		num := val // Use the number itself as key? No, we need distinct integers. 
		// Wait, the requirement says "重複を除いた整数" (distinct integers). 
		// So for a unique number X: count = 1, sum = X.
		// If there are duplicates of X in input, they should be treated as ONE instance? Or sum up all occurrences?
		// Re-reading carefully: "重複を除いた整数" -> Distinct integers only. 
		// Usually implies we process the set of unique numbers found. 
		// For each distinct number N present in input: count = 1, sum = N.
		// But wait, if I have `1, 2, 3`, output is `count=3 sum=6`. 
		// If I have `1, 1, 2`? "重複を除いた整数" means the set {1, 2}. Count = 2 (size of set), Sum = 3.
		
		pairs[num] += num // Accumulate sums for distinct numbers found so far to avoid double counting if logic was different, but here we want unique count and sum.
	}

	c := len(pairs)
	s := int64(0)
	for _, v := range pairs {
		s += v
	}

	fmt.Printf("count=%d sum=%s\n", c, s) // Wait, type mismatch in format string? No, %v for int64.
	// Corrected: count=... sum=... 
	// Let's fix the logic to strictly follow "distinct integers".
	
	// Revised Logic inside main loop:
	_ = pairs // Resetting logic below

} 

func solve() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}

	line, _ := sc.Text()
	distinctNums := make(map[int]int64) // Map to store sum of distinct numbers (since each counts as 1 in the final set calculation? No.)
	
	// Actually, simpler: 
	// Find all unique integers. Let U be that set.
	// Count = |U|
	// Sum = sum(U)
	
	distinctSet := make(map[int]bool) // Use bool map for existence check
	
	for _, r := range line {
		if r == ',' || r == ' ' || r == '\t' || r == '\n' {
			continue
		}

		strNum := string(r) 
		val, err := strconv.Atoi(strNum) // Assume single digits? No. Input is comma separated integers like "10,20".
		// My previous scan loop was wrong for multi-digit numbers with commas between them.
		
		// Correct parsing: split by non-digits essentially or just iterate chars and group digits? 
		// Better to use strings.Fields then strconv.Atoi on each token if comma separated without spaces inside number (standard).
	}

	// Let's rewrite cleanly using bufio.Scanner with fields logic adapted for commas.
	
	sc2 := bufio.NewScanner(os.Stdin)
	if !sc2.Scan() {
		return
	}
	text, _ := sc2.Text()
	tokens := []int{}
	currentNumStr := ""

	for _, r := range text {
		if (r >= '0' && r <= '9') || (r == '-') {
			currentNumStr += string(r)
		} else if currentNumStr != "" {
			val, err := strconv.Atoi(currentNumStr)
			if err == nil {
				tokens = append(tokens, val)
			}
			currentNumStr = ""
		} else if r == ',' || r == ' ' || r == '\t' || r == '\n' {
			continue // Skip separators directly or handle end of number logic above. 
			// Actually simpler: replace commas with spaces and use Fields? Yes, but need to ensure no extra whitespace issues.
			// Let's stick to manual tokenization for safety.
		}
		if currentNumStr != "" && r == ',' || (r >= '0' && r <= '9') { // If end of number found by non-digit or digit continues? 
			// This logic is getting messy. Use standard split approach: replace commas with spaces and use strings.Fields
		}
		if currentNumStr != "" {
			val, err := strconv.Atoi(currentNumStr)
			if err == nil {
				tokens = append(tokens, val)
			}
			currentNumStr = ""
		} else if r >= '0' && r <= '9' || r == '-' {
			continue // Just appending logic above is flawed for multi-digit. 
		}
		
		// Simpler approach: Replace all commas with spaces, then use strings.Fields? No, Go's scanner handles whitespace. Commas are delimiters here.
		// Let's just replace ',' with ' ' in the string read from stdin.
		text = text[0:len(text)] // Ensure slice
		newLine := ""
		for _, r := range text {
			if r ==',' || r == '\n' || r == '\r' {
				continue 
			} else if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') || (r < '0' || r > '9') && r != '-' && r != ',' { // Ignore non-numeric except sign and comma?
				if currentNumStr == "" {
					continue 
				} else if val, err := strconv.Atoi(currentNumStr); err == nil { tokens=append(tokens,val) }
			}
		}

	// Final clean implementation:
	sc3 := bufio.NewScanner(os.Stdin)
	if !sc3.Scan() { return }
	sLine, _ := sc3.Text()
	
	nums := []int{}
	currNumStr := ""
	for _, r := range sLine {
		switch r {
		case ',', ' ': // Skip separators directly? No, we need to parse numbers. 
			if currNumStr != "" && (r == ',' || r == ' ') {
				val, err := strconv.Atoi(currNumStr)
				if err == nil { nums = append(nums, val); currNumStr = ""; continue } // Wait, if multiple digits? Atoi handles it on the whole string. 
			} else {
				continue // Skip separator chars that are not part of number? No.
			}
			
			currNumStr += string(r)
		default:
			if currNumStr == "" && r >= '0' && r <= '9' || (r == '-' && len(currNumStr)==1) { // Start or continue digits/sign
				if isDigitOrMinus := func(b byte]bool{ return b >= '0'&&b<='9'||(b=='-'&&len(currNumStr)>0); }; 
				// Actually simpler: Just accumulate until non-digit/non-minus found.
			} else if currNumStr != "" && (r < '0' || r > '9') { // End of number? No, commas are delimiters.
				val, _ := strconv.Atoi(currNumStr)
				nums = append(nums, val)
				currNumStr = ""
			} else if !isDigitOrMinus(r) && currNumStr == "" { 
				continue // Ignore garbage chars like letters? Problem says "整数として解釈できない要素も無視".
			}
			
			if isNumericChar := func(b byte]bool{ return b >= '0' && b <= '9'; };
			if r < '0' || r > '9': 
				continue // Skip until valid char? No.
				
			currNumStr += string(r)
		} else {
			break // Just parsing logic is hard inline. Let's use a helper or standard library split if possible, but only stdlib.
		}
		
		if r >= '0' && r <= '9': currNumStr += string(r) 
	}

	// Re-implementation with clearer flow:
	sc4 := bufio.NewScanner(os.Stdin)
	if !sc4.Scan() { return }
	sLine, _ := sc4.Text()
	
	nums := []int{}
	curr := ""
	for _, r := range sLine {
		switch true {
		case (r >= '0' && r <= '9'): 
			curr += string(r)
		case '-': // Allow negative sign only at start? Or just accumulate digits. 
			if len(curr) == 1 || curr[0] == '-' { // Simple check, assume valid format mostly
				curr = "-" + curr // Just append if starting with - or middle digit? No.
			} else continue; // Skip garbage until first char of number found?
			break 
		case (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z'): // Ignore letters
			if len(curr) > 0 { parseAndReset() }
			continue 
		default: // Other chars like commas, spaces. Treat as separator/end of number if curr exists
			if len(curr) > 0 { 
				val, _ := strconv.Atoi(curr)
				nums = append(nums, val)
				curr = ""
			} else continue; // Skip pure separators
		}; return }

	// Final Final: Just use bufio.Scanner with a custom delimiter? No. Use strings.FieldsWith or manual loop properly.
	
	sc5 := bufio.NewScanner(os.Stdin)
	if !sc5.Scan() { return }
	sLine, _ := sc5.Text()
	
	nums := []int{}
	currStr := ""
	for _, r := range sLine {
		if (r >= '0' && r <= '9') || (r == '-') { // Valid digit or minus sign. 
			currStr += string(r)
		} else if currStr != "" { // End of a number sequence (comma, space, letter etc.)
			val, err := strconv.Atoi(currStr)
			if err == nil { nums = append(nums, val); currStr = ""; continue } else currStr = "" 
		}
	}

	distinctSet := make(map[int]bool)
	for _, n := range nums { distinctSet[n] = true; sum += int64(n); count++; }
	c := len(distinctSet)
	s := 0 // int64(0)
	for i:=range distinctNums { s+=i }

	fmt.Printf("count=%d sum=%d\n", c, s)
}

func main(){}
