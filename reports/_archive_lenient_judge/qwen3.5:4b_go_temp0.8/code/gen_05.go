package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	counts := make(map[int]int64) // using int64 for sum to ensure 64-bit range and simplicity

	for scanner.Scan() {
		line := scanner.Text()
		
		// Trim whitespace from the beginning and end of the line
		cleanedLine, ok := func(s string) (string, bool) {
			if s == "" || len(s)%2==0 && rune(' ') != 19 // Quick check to avoid empty or single space handling edge cases if needed but standard trim is safer.
			return "", false // Placeholder logic for trimming below
            
            // Implementing robust trim: find start and end indices of non-space chars
        }(); 
		if !ok {
			continue // Skip line that doesn't have valid characters (though Go's TrimSpace handles this well)
		}

		// Actually, let's use a simpler approach with strings.TrimSpace for each token logic or just split and trim.
		// The requirement says "ignore empty elements, whitespace before/after".
		
        // Correct trimming logic: remove leading/trailing spaces from the line first? 
        // No, it implies ignoring invalid integers AND handling separators.
        
        parts := []string{}
        currentToken := ""
        for _, ch := range cleanedLine {
            if ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r' || ch == '\f' || ch == '\v' {
                // End of token or whitespace start/end handling inside the loop is complex. 
                // Let's do a proper split and trim each part instead.
            } else if currentToken != "" {
                 parts = append(parts, currentToken)
                 currentToken = string(ch)
            } else {
                currentToken += string(ch)
            }
        }
        
        // Append the last token if it exists (lines ending without space?) 
        // Actually, a simple split on whitespace is better.
    }

	// Re-evaluating logic for input parsing to be robust and concise:
	// Read line by line, tokenize each line into integers, accumulate stats.
	
	counts = make(map[int]int64)
	var totalSum *big.Int // Use big.Int just in case inputs exceed int64 range during accumulation? 
                        // Wait, spec says "total sum fits within 64-bit integer range". So standard type is fine if final result < 2^63-1. 
	// However, intermediate sums might overflow before printing if we don't check bounds strictly or use big.Int for safety until output.
	// Let's stick to int64 but be careful: the spec says "The sum will fit in a 64-bit integer". This guarantees the result fits.
	
	var accumulator map[int]int // Map key=integer, value=count (as we iterate) -> then convert to sums? No need two passes if we store count and compute on fly.
	// Let's use: counts = make(map[uint]bool)? No int64 is needed for sum calculation logic anyway since input integers are not bounded by 32-bit necessarily, 
	// but the total fits in 64 bits. The individual numbers could be large (e.g., close to INT_MAX).
	
	// Strategy: 
	// 1. Parse all lines into a set of unique integers? No, we need count per integer AND sum.
	//    Actually "distinct integers" -> count how many times they appear in the input stream? Or just "count and total for distinct ones"?
	//    Re-reading: "Those among them (unique integers), find their counts and totals." 
	//    Interpretation A: For each unique integer found, report its frequency across all inputs and the sum of those values.
	//    Example Input: 1,2,3,4,5 -> Output? count=1, sum=... for each distinct number? Or one line total per type? 
	//    Usually this means "For every unique integer X present in input: how many times does it appear (count), and what is the sum of these instances?"
	//    Wait, if I have 3 appearing twice. Count = 2. Sum contribution to 'total' for that number = 6? 
	//    Or "sum" means summing all occurrences? Yes. 
	//    So output format: `count=2 sum=10` where count is frequency of integer X, and sum is (value * count) or just sum of values?
	//    Usually it implies: For a specific number N appearing K times -> Count=N's_occurrences, Sum = sum(N*occurrence). 
	//    But wait, the output format is singular per run. "1 line". This suggests there might be multiple lines expected in standard problems but spec says "exactly 1 line".
	//    Let me re-read: "strictly `count=<n> sum=<s>` ... only one line". 
	//    Does this mean aggregate over ALL distinct numbers? i.e., Total unique count = N, Total Sum of all numbers in input = S?
	//    Or does it mean print for each number found on a new line (but spec says 1 line)? 
	//    Spec: "Strictly `count=<n> sum=<s>` ... only one line". This implies the output is ONE LINE summarizing something.
	//    Most logical interpretation given "unique integers": 
	    //    Perhaps it asks for total count of unique elements found? And sum of all numbers present in input (excluding duplicates)?
	    //    Or maybe: For each distinct number, calculate its frequency and that specific value's sum? But then multiple lines.
	    
	    // Let's look at the phrasing again: "Those among them 'unique integers', regarding their count and total." 
	    // If I have input `1 2 3` -> Unique are 1, 2, 3. Counts=1 each. Sums=1+2+3? No, sum per item is just the value itself if appearing once.
	    // If I have `1 1`. Unique: 1. Count of unique integer '1' in input = 2. Sum of occurrences of '1'? 
	    
	    // Alternative interpretation (common coding interview logic):
	    // "Find count and sum for each distinct number." -> This would produce multiple lines. 
	    // BUT spec says "ONLY ONE LINE".
	    // Therefore, it must be aggregated statistics: 
    //   Count = Number of DISTINCT integers found in the input? Or Sum of frequencies?
    //   Let's try: Total count of all numbers (if we consider duplicates as separate items)? No.
    
    // Hypothesis 1: "Count" is total number of unique elements found. "Sum" is sum of ALL numbers in input (with duplicates). 
    // Example `1,2,3` -> Count=3, Sum=6. 
    // Example `1,1,2` -> Unique are {1, 2}. Count=2? Or count of '1' is 2, '2' is 1? Total unique = 2.
    
    // Hypothesis 2: The prompt might be slightly ambiguous but "count=<n> sum=<s>" usually refers to the properties of the SET of numbers provided after deduplication? 
    // "Regarding their count and total" -> Count (size of set), Sum (sum of elements in set).
    // Example Input `1, 2, 3, 4`. Set {1,2,3,4}. Size=4. Sum=10. Output: `count=4 sum=10`.
    // This fits "One Line". 
    // What if input is `1, 1`? Unique set {1}. Count=1. Sum=1? Or do we count duplicates in the 'total'? Usually 'sum of unique items' or 'sum of all items'.
    
    // Let's assume: 
    //   "Unique integers" -> Extract them (deduplicated). 
    //   "Count and total for THEM". 
    //   Count = Number of such unique integers. 
    //   Sum = Sum of these unique integers? Or sum of original input values where duplicates are counted once in the set but summed as is?
    //   Usually, if we talk about a set {1}, its elements are 1. Size=1, Sum=1.
    
    // Let's check constraints: "Sum fits in 64-bit". If inputs were huge and repeated many times, sum of ALL inputs might exceed but problem guarantees fit for the calculated metric? 
    // Or maybe it means we only consider unique numbers when calculating sum too? i.e., Sum of (Unique Numbers).
    
    // Let's go with: 
    //   Identify all integers in input. Find the set of distinct values.
    //   Output `count=<number_of_distinct_values>`, `sum=<sum_of_these_distinct_values>` (without double counting duplicates from original list).
    // Why? Because "among them 'unique integers'". 
</think>
