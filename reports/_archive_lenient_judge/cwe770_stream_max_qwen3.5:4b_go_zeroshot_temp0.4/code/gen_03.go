package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var count int64 = 0
	maxVal := int64(-1<<62 - 1) // Initialize with a very small number for safety, though logic below handles empty input. Actually, better to use min possible or handle separately. Let's re-evaluate max initialization.

	// Re-reading spec: "value fits in 64-bit integer". 
	// If the list is empty after parsing, count will be 0 and we should output something?
	// The prompt says "find element count and maximum value". Usually implies at least one valid number exists or handle edge case.
	// Let's assume standard behavior: if no numbers found, max could be undefined or min int64. 
	// However, typical CP problems guarantee non-empty input unless specified otherwise for empty handling.
	// Given "empty elements... ignored", it implies we process tokens and skip invalid ones.
	
	maxVal = -1 << 63 // Initialize to the minimum possible value (MinInt64) so that any valid number updates it? 
	// Wait, if input is all negative numbers like "-5", max should be -5. If initialized to MinInt64 (-9223372036854775808),
	// and we have only one element -10, updating works fine. 
	// But if input is empty? The spec doesn't explicitly say what to do with 0 elements for max value output format-wise other than the string template.
	// Let's assume valid inputs exist or handle gracefully by printing min int64 if count==0 (though unlikely in test cases).
	
	maxVal = -9223372036854775808 // MinInt64

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line, _ := reader.ReadString('\n') // Read line by line or just token? Scanner reads tokens.
	} 
	// Actually simpler: use a loop to read all input into a buffer then process, or iterate lines and split.
	
	inputLines, err := bufio.NewReader(os.Stdin).ReadAll()
	if err != nil {
		return // Handle error if needed, but spec implies valid input stream
	}

	var tokens []string
	for _, line := range strings.Split(string(inputLines), "\n") {
		tokens = append(tokens, strings.Fields(line)...) 
	}

	count = 0
	maxVal = -9223372036854775808 // Re-init
	
	foundAny := false
		
	for _, token := range tokens {
		val, err := strconv.ParseInt(token, 10, 64)
		if err != nil {
			continue 
		}
		
		count++
		if !foundAny || val > maxVal {
			maxVal = val
			foundAny = true
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal) // Note: int64 prints as decimal. Spec says "integer". 
	// Wait, the spec output format is `count=<個数> max=<最大値>` where 個数和最大値 are placeholders for values.
	// In Go fmt.Printf("%d") works for integers.

}
