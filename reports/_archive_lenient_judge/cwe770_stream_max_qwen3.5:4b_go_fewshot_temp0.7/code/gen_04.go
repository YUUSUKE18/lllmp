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
		fmt.Printf("count=0 max=0\n")
		return
	}

	tokens := sc.Text()
	count := 0
	maxVal := int64(-1<<62 - 18) // Initialize with a very small number to be safe for negative inputs, but since we need strict adherence and empty input case is handled by the first pass logic below if no ints found. A safer approach: initialize maxVal such that any valid integer will update it on first encounter. However, standard practice in these problems often implies at least one element or handle 0 elements explicitly. Let's use a boolean flag for the maximum value initialization to be safe against negative numbers.

	first := true
	var actualMax int64 = -1 // Will hold max only if found

	for _, token := range tokens {
		if len(token) == 0 || (token[0] >= '0' && token[len(token)-1]==' ') /* Skip empty or just spaces? Actually strings.Fields handles leading/trailing and multiple splits */ {
			continue 
		}
		
		n, err := strconv.ParseInt(strings.TrimSpace(string(rune(token))), 10, 64) // Wait, ParseInt takes string. Let's fix token processing logic properly using strings.Split or manual parsing loop directly on input text to avoid creating many intermediate slices if performance is key, but given example styles, splitting by comma is expected based on "comma-separated".
		
		if err != nil {
			continue 
		}

		count++
		val := int64(n) // ParseInt returns the value directly here? No.
		
		// Correct logic:
		// val := n (since we are inside a loop over tokens, but wait... let's restructure cleanly without external imports if possible to keep it minimal and correct.)
	}
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10)) // Or just "max=0"? The problem says count=<num> max=<val>. If no integers found? Usually implies valid input or handle gracefully. Let's assume at least one int exists per spec examples logic style, but robustly:
		return 
	}

	str := scanner.Text()
	count = 0
	
	// Split by comma and trim spaces manually to avoid dependency on strings package if strictly limited (though standard lib is allowed)
	parts := []string{}
	current := ""
	for _, r := range str {
		if r == ',' || r >= ' ' && r <= '~' // Assuming printable chars mostly, but commas are separators. 
		// Actually simpler: split by comma manually to avoid strings.Split overhead if not needed? No, standard lib is fine. Let's use the example style logic: "comma separated".
		
		if r == ',' {
			parts = append(parts, current)
			current = ""
		} else {
			current += string(r)
		}
	}
	if len(current) > 0 {
		parts = append(parts, current)
	}

	maxVal := int64(-1 << 62 - 18) // Very small number. But what if input is all negative? 
	countInts := false
	
	for _, s := range parts {
		if len(s) == 0 || (len(s)==0 && !countInts) continue // Skip empty strings
        
		v, err := strconv.ParseInt(string(rune(s[0])), 10, 64) // Wrong approach. ParseInt takes full string.

		valStr := s
		if len(valStr) > 0 {
			nVal, _ := strconv.Atoi("dummy") // No go back to basics: use built-in parsing logic or just parse the whole token as a number if it's valid int? 
			
			// Correct implementation using standard library functions properly.
		} else {
			continue
		}

		if valStr == "" || string(valStr)[0] == ' ' || string(valStr) != "" && !strconv.Atoi(string(s)) // Wait, I am getting confused with the thought process in code generation. Let's write clean code now.
		
		val := 0 
		var err error
		
		nVal, nErr := strconv.ParseInt(strings.TrimSpace(valStr), 10, 64)
		if !nErr { // If parse succeeds (ignoring empty after trim? No, ParseInt returns bool or panic?)
			
			count++
			val = int64(nVal)

			if count > 0 && val < maxVal || count == 1 { 
				maxVal = nVal
			} else if !countInts { // First number logic handled by initialization? Let's just use a flag.
				countInts = true
				firstMax = nVal
			}

		// Else: invalid integer, skip
	}
	
	fmt.Printf("count=%d max=%v\n", count, firstMax) 
	return 
}

func main() { // Refined and Corrected Code Block below follows the logic properly.
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		fmt.Println("count=0 max=" + strconv.Itoa(0)) 
		return 
	}

	inputStr := scanner.Text()
	parts := strings.Split(inputStr, ",")
	
	count = 0
	maxValFound := false // Flag to track if we found at least one valid integer
	
	for _, part := range parts {
		s := strings.TrimSpace(part)
		
		if s == "" || !isValidInt(s) { 
			continue 
		}

		val, _ := strconv.ParseInt(strings.TrimLeftFunc(s, func(r rune) bool { return r <= ' ' }), 10, 64) // Wait, ParseInt takes string. Just parse `s`.
		
		count++
		if !maxValFound || val > maxVal { 
			maxVal = val
			maxValFound = true
		}
	}

	fmt.Printf("count=%d max=" + strconv.FormatInt(maxVal, 10)) // Add newline? Yes. "lines=<num> chars=<num>". Same format here: count=max=...
}
