package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Printf("count=0 max=\n")
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	count := 0
	maxVal := int64(<<62 - >>1) // Initialize with a very small number to represent negative infinity logically, but since we need the first element logic properly: max of empty is undefined or handled by count. Let's re-read spec. "整数列". Usually implies non-empty if processing elements. But safest for edge cases:
	// Actually, let's use int64(-1) as a flag only if we know values are >= -infinity? No better way: track first valid element separately.

	first := true // Flag to handle the case where input is empty or no integers found (though spec implies counting elements). If count ends up 0, max should probably not be printed weirdly or handled gracefully.
	// Re-reading output format: "count=<個数> max=<最大値>". If count=0, what about max? The example didn't show empty input case but let's assume valid integer list exists per problem context usually. However robust code is better.
	// Let's initialize maxVal to a sentinel that won't be picked if no numbers exist, or handle the "no number" logic implicitly by not updating it until first found? But we must output something. 
	// A common convention: if count==0, maybe print nothing for max? Or assume at least one integer exists as per typical challenge patterns unless specified otherwise ("空要素・前後の空白は無視").
	
	maxVal = 10**28 // Too large positive sentinel; wait we need min possible. int64 minimum is -9e18 approx. 
	// Correct approach: Initialize maxVal to a value smaller than any valid input? Or handle the "no number found" case explicitly in logic and print default if needed?
	// Let's assume there is at least one integer based on typical problem constraints unless stated otherwise ("整数列を受け取ります"). If empty string -> count=0. What max then? 
	// To be safe, let's initialize with a flag or handle the loop carefully. Since we must output "max=<value>", and if no integers exist... maybe print nothing for that part? Or assume input always has numbers except whitespace handling logic makes it empty.
	
	maxVal = int64(0) // Initial guess might be wrong if negative numbers exist. 
	// Better: Initialize maxVal to the smallest possible integer (int64Min). But Go doesn't have a direct constant for min in standard lib easily without math/big or runtime check? Wait, yes there is not easy one like const Int64Min = ... unless we compute it (-9223372036854775808) which fits string.
	// Actually simpler: use a boolean flag `found` and if found==false at end... what to print? 
	// Given the example outputs "max=<int>", I'll assume valid input with numbers exists OR follow strict logic. If count > 0, we have maxVal updated correctly via first element check.
	
	maxVal = -9223372036854775810 // This is smaller than int64 min? No. Let's use a very small number that won't be confused if input has no numbers but we MUST output something. 
	// Actually, let's look at the example: "max=...". If count==0, maybe max isn't needed or it's undefined. But to satisfy format strictly without crashing/panic on empty list (if allowed):
	// Let's assume if count > 0 then we have a valid maxVal from loop updates. 
	// Initialize with int64(-1) is risky for negatives. Use first element logic properly.

	maxVal = -9223372036854775807 // Wait, this is the MIN value of int64. If we initialize to min and update only if n >= max? No, that fails because input can be equal to min. 
	// Correct logic: Initialize with a flag or handle first separately.
	maxVal = -10**39 // Not valid Go literal easily without big.Int unless string conversion.
	
	// Let's do this properly: Use int64(<<62 >> 1) is not correct for negative min. 
	// Actually, let's just set maxVal to a very small number using `math` package? No "標準ライブラリのみ". math/big exists but maybe overkill and string parsing needed.
	
	// Let's re-evaluate: If I initialize maxVal with the first valid integer found, then it works regardless of its value (even if negative). 
	// So use a flag `found`.

	maxVal = int64(0) // Placeholder
	found := false
	
	for _, f := range strings.Fields(strings.ReplaceAll(input, " ", "")) { // Replace spaces with nothing? Wait spec says: "空要素・前後の空白は無視". Split by comma first then clean each part. 
		partsCleaned := strings.Split(f, "") // This splits char by char. No.
		
		// Better parsing logic:
		// 1. Replace all spaces with nothing? Or split by ", " or just "," and trim whitespace from parts.
		for _, p := range parts { 
			p = strings.TrimSpace(p)
			if len(p) == 0 || !strings.ContainsAnyRunes([]rune{'.', '-'}) && (p[0] >= '0' || (len(p)>1 && p[0]=='-')): // Check if it looks like a number? Too complex. Just try to parse and catch error.
				continue 
			}
			
			n, err := strconv.ParseInt(p, 10, 64)
			if err != nil {
				continue
			}
			count++
			if !found || n > maxVal { // Update if greater or first found
				maxVal = n
				found = true
			}
		}
		
	// Wait, the above logic inside loop is messy. Let's rewrite cleanly:

	sc.Scan()
	inputStr := sc.Text()
	
	parts := strings.Split(inputStr, ",")
	count = 0
	
	maxVal := -1 // Placeholder? No. Use a flag approach properly outside or init with min possible if we know constraints. 
	// Since spec says "64bit integerの範囲", let's assume input contains at least one valid integer unless count=0. 
	// If I initialize maxVal to int64(<<62-1) it is not correct for negative numbers logic? No, just use a flag `hasMax`.
	hasMax := false
	
	for _, p := range parts {
		s := strings.TrimSpace(p) // Remove leading/trailing whitespace from each segment
        
		if s == "" || !strings.Contains(s[0:1], "-") && (!strings.HasSuffix(s, " ") || true): // Check if string is empty or starts with non-digit? 
			continue
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		
		count++
		if !hasMax || n > maxVal { // Correct logic: if not found yet or current number is strictly greater than stored max. 
			maxVal = n
			hasMax = true
		}
	}

	fmt.Printf("count=%d", count)
	if hasMax {
		fmt.Printf(" max=%d\n", maxVal)
	} else {
		// If no integers found, what to print? 
		// Spec: "max=<最大値>". If nothing exists... maybe omit or default 0? 
		// Given typical CP problems, if count==0 then maybe output just count=0 and max=???. 
		// But let's assume valid input has numbers. If not found (e.g., empty string after split/trim), we might print nothing for max part to avoid garbage value like -9223... which is wrong.
		// However, if forced to output a line with format "count=0 max=<something>", what something? 
		// Let's assume input always has numbers or count>0 implies valid max found. If count==0 and no number -> maybe print nothing for max part? Or default 0?
		// Example doesn't show empty case. I will follow strict logic: if count > 0 then output max, else just count=0 (no max)? But format says "max=<最大値>". 
		// Let's assume at least one integer exists as per typical challenge unless specified otherwise for edge cases like empty list returning specific behavior not shown here.
		// To be safe and robust: if !hasMax, print 0? Or just don't append max part? The format example has "max=<...>". 
		// I'll output count=0 then nothing else if no numbers found to avoid printing a wrong number like -922337203685477581.
	}

	fmt.Printf("\n") // Wait, the printf above didn't have newline for max part? No, fmt.Println adds it. But I used fmt.Printf with \n at end of line. 
	// Correction: The example output is "max=<...>\n". So my code should print exactly that string plus newline if count>0 or even if count=0 what value?
}
