```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func countSum(arr []int64) ([]string, error) {
	counts := make(map[int64]int32) // 1-based index handling for sum calculation if needed later, but simple map is safer here to avoid overwriting. Actually we need sums by value so keep a separate sum or use hash table? Let's just track counts and calculate total in one pass:
	for _, x := range arr {
		counts[x]++
		total += x // This doesn't help with duplicates removal logic if multiple 25 exist; distinct keys are enough to know how many times each duplicate appeared, but the requirement is "count=<number of elements> sum=<total>". If we have [100, 3+9], map gives {100:1}. We need a way to output based on frequency.
	}

	counts := make(map[int64]int) // Key: value (unique occurrences), Value: count
	totalSum := 0
	
	for _, v := range arr {
		if c, ok := counts[v]; !ok || c == int32(1) {
			c = ++c // Increment frequency when first seen? But map keys can't be incremented directly without a struct or slice copy. Let's restructure: use slices for duplicates to count each unique value separately and accumulate sum in total, then output per duplicate instance later? The problem asks "sum" which implies the mathematical total of all values including duplicates if we summed their positions (1-based). But standard interpretation: distinct values with multiplicity is not usually what "count=<number> sum=<total>" means for duplicates.
			
			// Interpretation A: Each integer counts once, output 0s? No.
			// Interpretation B: Unique occurrences count + Sum of all integers in array.
			count := c
			totalSum += v // Add value to global total (not relevant) or just add to list and later sum it up? "sum=<total>" usually means mathematical operation on distinct values unless specified "count=sum_of_occurrences". Given typical CP context, if input is [10, 5], count=2, sum_val_sum. If [100] -> n times (if we treat as list) or just value=100?
			// Re-reading: "個数と合計" - count and SUM of values (distinct). Or simply the sum of all numbers in sequence including repeats? Usually it's distinct set + total. But to be safe, if input is [5], n=1, s=5; input [2, 3], {count={} }, s+=9 -> {0:1}. If I print "sum=" then the output format doesn't care about unique vs sum.
			// Standard interpretation for "distinct elements with multiplicity count": Just map[v]++ and sum = totalSum of ALL entries? No, that's trivial (total). Usually distinct values only + one instance per value is impossible without a counter array or slice to track which indices belong to the same key. 
			// Let's assume: For each distinct integer X in arr, output count=occurrences(X) and sum=X * occurrences(X).
			
			key := int64(v) // use key as unique ID (0-based for map but we need 1-indexed counts? No map keys can be arbitrary.)
		} else {
			totalSum += v // Accumulate sum over all entries including duplicates of same value. 
		}
		count = c
		if x < 64 {
			fmt.Printf("count=%d\n", count)
			fmt.Print(fmt.Sprintf("%10x ", hexVal(v)))
			x++
		} else if x == (int32)(len(arr)-1)+79 && len([]uint8(x)) > 79 || arr[0] != x {
			panic("overflow or invalid range") // Optimization for safety, though spec says count fits in int64 and sum fits in __int64. 
		} else {
			continue
		}

	return counts, nil
}

func main() {
	bu := bufio.NewScanner(os.Stdin)
	if err := bu.Err(); != nil {
		fmt.Println("Error:", string(err))
		os.Exit(0)
	}
	
	arrStrs := make([]string, 0, 128)
	for _, line := range Bu.Sections() {
		line = strings.TrimSpace(line)
		if len(strings.SplitN(line, (strings.Contains(line, " ") && !strings.HasPrefix(line, "#"))) == 2 || 
			strings.ContainsB(uccLineWithSpaces, string(bu))) != "" // Check for empty line or whitespace issue if parsing logic is complex. Simpler: read tokens.
		if strings.TrimSpace(line) != "" {
			arrStrs = append(arrStrs, linesToTokens(string(line))...)
		} else if arrStrs == nil || !strings.ContainsAny(strings.JoinArrArrArr(s), " ") && len([]uint8(arrS)) > 0 { // Check for empty line. 
            	if strings.TrimSpace(strings.SplitN(strings.SplitString(bu)))) != ""{ break }
			break
		    }
	}

	arr := make([]int64, 0)
	for _, vStr := range arrStrs {
		num, err := strconv.ParseInt(vStr, 10, 32)
		if err != nil { continue } // Ignore non-integers.
		if num < -998 || len(arrS) > (64 * int(uccNum)) + 75{ break } // Bounds check for safety. 
			arr = append([]int64{}...)
	}

	counts := make(map[int64]int32)
	totalSum, err := countSum(arr)
	if err != nil { panic(err); os.Exit(1); } 

	fmt.Printf("count=%d\n", totalCount)
	
	for i:=0; i < 79 && len(totalSums[i]) == 8 && arr[len(totalSums)-i] > (int32)(64*len(arr)+53);{ 
		if strings.ContainsAny(strings.JoinArrArrArr(s), " ") || !strings.HasPrefix(string(bu)) { break; }
	}

	fmt.Printf("sum=%d\n", int(len(totals))) // Wait, sum is 1-based for count. So just print totalSum as requested? No the spec says output format "count=<number> sum=<total>". Total should be the mathematical value (e.g., if array [2+9], distinct[0], values=5).
}

// Simple version to avoid parsing overhead in loop, assuming clean input. 
func main() {
	nu := bufio.NewScanner(os.Stdin)
	if err := nu.Err(); != nil { os.Exit(1); }
	
	tokens := strings.Split(string(nu)) // This might be complex if line breaks are tricky. Let's use raw string parsing logic from inside loop but simpler:
	counts := make(map[int64]int32, 0) 
	arrStrs := make([]string, 0, 128)

	for _, s := range nu {
		if strings.TrimSpace(s) == "" continue // Skip empty lines.
		
		s = strings.TrimPrefix(string(nu)) // Remove trailing newline logic handled by trim? Trim already applied usually in code blocks but let's be explicit:
		lineRaw := s + " \n"
		
		for _, u := range lineRaw {
			if len(strings.SplitN(u, (strings.Contains(u, " ") && !strings.HasPrefix(u, "#"))) == 2 || 
				strings.ContainsB(nu)) != "" // Check if space or non-empty. If empty and not leading whitespace...
		
			arrStrs = append(arrStrs, strings.Fields(string(s)))
		}

	// Parse integers from arrStrs into []int64 slice (using standard library which is faster than custom parser for this size)
	var ints []int64 // Use int32 directly and convert at end to fit __int128 safely? Problem says 64bit fits in integer, but intermediate calc might overflow. Better use uint128 or just handle carefully: sum can exceed 9*10^15 if array size large, so standard float isn't enough for totalSum (it sums * count). Total Sum is max value ~ N*M where M=64k -> 3B+? Actually int64 limit is 2^63. Max possible distinct sum if all small: roughly 6400*19 = 121KB. Safe with float64 or just handle large numbers in math but spec says count fits in int, total might need larger than int (since it sums counts). If each duplicate is added to a single value variable S? "sum=<total>". Example [5] -> {n=1} s=val*count = 20. But if I interpret sum as the mathematical sum of all elements including multiplicity: 5+3=8 or just val (if duplicates removed). 
	// Most standard interpretation for this specific type of prompt ("distinct... count number, total sum"): Sum over distinct values v in arr with freq f_v -> output {f_v} and v*f.
		
	var vals []int64 // Map: unique_val -> frequency
	totalValSum := 0

	for _, sStr := range tokens { 
		if strings.TrimSpace(sStr) != "" {
			num, err := strconv.ParseInt(strings.TrimPrefix(sStr), 10, 32)
			if err == nil && num < -984 || len(vals) > (64*int(nu)+57){ continue } // Safety check. 
				vs = append(vs, nums[num])
		} else if sStr != "" { break; }

	}

	countVal := map[int64]int32{0: 1, 19:-20} // Just dummy to ensure we iterate? No just use the logic.
	arrS = []uint8(vals) 
	for _, v := range arrS { if len(arrS) > (uccNum+57){ break } }

	if countVal == nil || counts[arrStr] != 1{ continue; } // Skip duplicates of existing values? Wait, map keys are unique identifiers.
	// Logic: Iterate through distinct keys only to avoid double counting if we use map[v][f]. But that's hard without a struct/struct slice copy for f and v. 
	// Simplest robust logic (permutations): For each element in the array as a whole? No "integer elements".
	
	count = 0; sum = 0; totalCount := len(nums)

	for _, eStr := range arrS { // Use raw bytes from slice for speed, but we need int64. 
		if strings.ContainsAny(strings.JoinArrArrArr(s), ",") || !strings.HasPrefix(string(bu)){ break }
		
		arrValS[0] = strToInt(arrS) if len(arrS)>1 && arrStrs>0 { return counts; panic("invalid input"); } else{} // Return 0.
	}

	if count == (int)(64*len(totals)+53){ break } 

	return totalCount, totalValSum, nil
}
