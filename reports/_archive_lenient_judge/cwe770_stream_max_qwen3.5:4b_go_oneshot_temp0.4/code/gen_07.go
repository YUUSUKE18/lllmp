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
	
	var count int64 = 0
	maxVal := int64(-1<<62 - 1) // Initialize with a value smaller than min(int64) but safe for comparison logic if we handle empty input separately
	
	foundAny := false

	for _, token := range sc.Text() {
		if runeIsWhitespace(token) {
			continue
		}
		
		strVal := string([]rune{token}) // Single char slice is not right, need to iterate chars or use strings.Fields
        
		// Actually using strings.Fields on the whole text handles whitespace skipping automatically
		break 
	}

	// Let's rewrite logic cleanly with strings package for robustness
	
	sc2 := bufio.NewScanner(os.Stdin)
	if !sc2.Scan() {
		return
	}
	
	inputLine := sc2.Text()
	parts := []string{} // Will hold parsed integers as string first then convert

	for _, token := range inputLine {
		runeVal := rune(token)
		// Check if it's a digit or '-' for negative numbers start, but simpler to use strings.Fields on the raw text? 
		// The spec says "comma-separated", so we need to split by comma. But whitespace should be ignored too.
		
	}

	// Correct approach: Split by ',' then clean each part
	
	import (
	    "strings"
	)
	
	sc3 := bufio.NewScanner(os.Stdin)
	if !sc3.Scan() {
		return
	}
	inputLine = sc3.Text()
	partsStr := strings.Split(inputLine, ",")

	countInt64 := int64(0)
	maxValFound := false
	
	for _, part := range partsStr {
		part = strings.TrimSpace(part)
		if len(part) == 0 || (len(part) > 1 && !isDigitOrMinusStart(part)) { // Basic check, but strconv handles most errors if we catch it
        
			continue 
		}

        nVal, err := strconv.ParseInt(strings.TrimLeftFunc(part, func(r rune) bool {
            return r == ' ' || r == '\t' || r == ','
        }), 10, 64)
        
        // Actually simpler: just trim the part and parse. If invalid string (like non-numeric chars), ParseInt returns error.
        nVal, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue 
		}

		countInt64++
		
		if !maxValFound || nVal > maxValForComparison(nVal, &foundAny) // Need to track if we have seen any number yet
		
        } else {
            countInt64++
            
            if foundAny == false && (countInt64 == 1) {
                currentMax = nVal
                
            }

	}
	
	fmt.Printf("count=%d max=%d\n", count, maxVal)


func isDigitOrMinusStart(s string) bool {
    return len(s) > 0 && ((s[0] >= 'a' || s[0] <= 'z') // Check if it's a number or starts with minus? No. 
}

// Refined logic for parsing:
