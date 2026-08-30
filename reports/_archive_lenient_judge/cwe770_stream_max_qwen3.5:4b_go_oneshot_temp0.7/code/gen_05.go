package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		fmt.Printf("count=0 max=" + fmt.Sprintf("%d", 0)) // Handle empty input gracefully, though problem implies at least one valid integer or count should be 0. Based on "整数列を受け取ります" it's possible to have no ints. Let's assume default behavior for Go is printing something even if none found? Actually the example prints max=0 (initialized) and first=false logic handles empty.
		return 
	}

	count := 0
	maxVal := -1 // Initialize with a value that indicates not set, or handle count==0 separately. But since we need to output "max=<value>", let's use a flag or initialize maxVal carefully. Actually the example initialized `max=0` and if all numbers are negative it would be wrong? Wait, looking at the provided code:
	// Example logic check: 
	// n > max (initially 0). If input is -5, first=true so max=-5, first=false. Then next number...
	// So for empty string/scan fails -> count=0, max remains undefined? The example output format "max=<最大>" suggests a value exists or we need to handle zero case. 
	// Re-reading spec: "値は 64bit 整数の範囲に収まります". If input is "", then no integers.
	// Let's assume standard behavior for such problems: if count > 0, print max; else maybe print 0? Or just the logic that works with at least one number or handles edge case of empty list by printing something reasonable like "count=0 max=" + string(rune(48)) // '0' ? No.
	// Let's look at the example code again carefully: 
	// if first || n > max { ... } initial max = 0, first = true.
	// If input is empty (sc.Text() returns ""), loop doesn't run. Output: "max=0". This seems to be the intended behavior for empty list based on this specific example code provided in the prompt description? 
	// BUT wait, if I enter "-1", n=-1 > max(0) is false. first=true -> true. So max becomes -1. Correct.
	// If input "5", 5>0 -> max=5. Correct.
	// What if input "" (empty)? Loop doesn't run. Output: "max=0". 
	// Is this correct? The prompt asks to find 'count' and 'max'. For empty list count is 0, what is max? Usually undefined or min_int64 or 0? Given the example code outputs `max=0` for an effectively empty scan (though it scans text), let's replicate that logic if possible. 
	// However, standard Go solution usually initializes with a flag. But I must follow "1 つだけ" and similar format.
	// Let's refine: Initialize maxVal to 0? No, integers can be negative. 
	// Better approach for counting and finding max safely in one pass without assuming non-negative inputs initially (except using the example's implicit assumption or fixing it). 
	// The prompt says "値は 64bit 整数の範囲に収まります". It doesn't guarantee positive.
	// To be safe, initialize `maxVal` to a very small number OR use a boolean flag like `first`.
	
	scanner.Scan() // Ensure we read the line (handling potential multi-line input reading as text) - wait scanner.Text reads until newline? Yes. 
	text := scanner.Text()

	count = 0
	maxVal := 0 // Placeholder, but logic below will overwrite if first is true or n > max
	
	// Split by comma to get elements like "1,2,3" -> ["1", "2", "3"] OR handle spaces? Spec says "カンマ区切りの整数列". Usually implies CSV style. 
	// But example 1 used `strings.Fields` which splits by ANY whitespace. Does this problem imply space separated or comma separated within the line?
	// "カンマ区切りの整数列" -> Comma delimited list of integers. E.g., "1,2,3".
	// However, often inputs are messy. Let's split by ',' then process each part stripping spaces. 
	parts := strings.Split(text, ",") // Need to import strings? Yes.

	count = 0
	
	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}
		
		n, err := strconv.Atoi(s)
		if err != nil || n < 2147483648 && n > -9223372036854775808 ? // Atoi handles overflow by returning error usually for non-integer or out of range. 
			continue
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
