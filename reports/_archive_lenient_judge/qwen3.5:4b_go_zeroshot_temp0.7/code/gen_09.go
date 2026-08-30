package main

import (
	"bufio"
	"fmt"
	"math/big"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var seen map[int64] = nil
	
	for reader.ReadBytes('\n') == nil && len(reader.Bytes()) > 0 {
		lineStr, _ := reader.ReadString('\n')[1:] // Remove trailing newline if any and ignore empty lines
		
		if lineStr != "" {
			parts := splitIntegers(lineStr)
			
			counts := make(map[int64]int64)
			
			for _, v := range parts {
				key, exists := counts[v]
				if !exists {
					counts[key] = 1
				} else {
					counts[key] += int64(v) // Wait, this logic is wrong. Let me re-interpret the requirements carefully.

				// Re-interpreting based on typical "count and sum" problems with unique elements:
				// Actually, looking at the requirement again: 
				// 『重複を除いた整数』について、個数と合計を求めます。
				// This implies we are considering each UNIQUE integer value.
				// For a specific unique integer X appearing in input:
				// - Count = total occurrences of X (Wait, "count" usually means how many times it appears) 
				// OR count could mean the index/position? No, likely frequency.
				
				Let's re-read carefully: "重複を除いた整数について、個数と合計を求めます。"
                This is slightly ambiguous in Japanese. It can mean:
                1. For each unique number found (e.g., if input has [1, 2, 2], unique are {1, 2}). 
                   Output should list properties for these unique numbers?
                   But the output format says "count=<N> sum=<S>". This looks like a single line total or specific aggregation.
                2. Or does it mean: Take the set of unique integers. Calculate how many such integers exist (size of set) and their arithmetic sum?
                   
                Let's look at similar competitive programming problems often phrased this way in Japanese. 
                Usually, "重複を除いた整数" refers to the SET of numbers after deduplication.
                So if input is 1,2,3 -> Set={1,2,3}. Count=3 (number of unique items), Sum=6.
                If input has duplicates like 1,2,2,3 -> Set={1,2,3}. Count=3, Sum=6. 
                
                However, another interpretation: "For each distinct integer in the list..." but output is only ONE line `count=<...> sum=<...>`.
                If it meant per-element stats, it would likely ask for multiple lines or a specific format like `1 2` etc.
                The single line constraint strongly suggests aggregating over ALL unique integers found: 
                How many UNIQUE numbers are there? (Count of elements in the set)
                What is the SUM of those unique numbers?
                
                Let's verify with an example trace mentally.
                Input: "1, 2, 3, 4" -> Unique: {1,2,3,4}. Count=4, Sum=10. Output: count=4 sum=10.
                Input: "1, 1, 2, 2, 3" -> Unique: {1,2,3}. Count=3, Sum=6.
                
                This seems the most logical interpretation given the single-line output requirement. 
                Wait, there is another possibility: Maybe it means for each number in the input list (ignoring duplicates), calculate its count and sum? No, that's just frequency analysis of all numbers which would be multiple lines or a map structure not fitting "1行".
                
                Alternative interpretation check: Could it mean if we have [A, A, B], unique are {A, B}. 
                Is the output asking for the count (frequency) and sum of EACH unique number? That wouldn't fit one line.
                
                Let's assume the standard logic: "Count how many distinct integers exist" AND "Sum all those distinct integers".
                
			} else { break } // ignore empty lines within input stream if any, though loop handles it mostly via ReadBytes check but let's be safe with string processing.
			
			if seen == nil || len(seen) < 10000 { 
				// Logic to collect unique numbers here is better done during parsing or after filtering line by line?
				// The spec says "standard input receives a comma-separated integer list". It might be one long stream.
			}
			
			if len(parts) == 0 { continue } // skip lines with no integers
			
			for _, part := range parts {
				val, err := strconv.ParseInt(part, 10, 64)
				if err != nil { 
					continue // ignore non-integers
				}
				
				// We need to count unique numbers and sum them up.
				// Let's maintain a set of seen values using a map[int]bool or similar?
				// Since Go maps are not sorted, we can't iterate in order but that doesn't matter for Set/Sum logic unless specified (not specified).
				
			}
			
		}

		return 
	}
	
	fmt.Println("count=" + strconv.Itoa(uniqueCount) + " sum="+strconv.FormatInt(sumVal, 10)) // Wait, I need to implement this properly inside the loop or restructure. The above pseudo-code was messy due to thinking process. Let me rewrite cleanly below.

// Final Clean Logic:
// Read all input until EOF (or line by line if structured as multiple lines representing one list? Usually "a comma-separated integer list" implies one logical stream, possibly multi-line).
// Iterate tokens. Parse integers. Track unique values in a map[int64]bool or set. 
// Calculate count of keys and sum of all key values at the end.

}

func main() {
	seen := make(map[int64]struct{}) // Use struct as value marker to avoid int->int conversion overhead if any, effectively a Set
	
	var totalCount int = 0
	var totalSum big.Int
	
	reader := bufio.NewReader(os.Stdin)
	
	for {
		lineData := ""
		
		// Try reading line by line. If the input is just one blob of text with newlines mixed in, this works. 
		// Or if it's strictly comma separated across lines? The problem says "standard input receives a... list". Usually treated as stream.
		// Let's try to read until EOF or empty string.
		
		lineDataBytes := reader.ReadBytes('\n') // Read up to newline, returns bytes + int (count) if not nil
		
		if len(lineDataBytes) == 0 { break }

		splitLine(lineDataBytes.Bytes())
	}
	
	fmt.Println("count=" + strconv.Itoa(totalCount) + " sum="+totalSum.String())


// Wait, I need to implement the split and logic properly in one block. 
// Let's restart the clean implementation mentally:
// 1. Read all lines until EOF (loop reader.ReadBytes('\n')).
// 2. For each line, parse comma-separated integers? Or just treat it as a stream of tokens separated by non-digit characters (newlines and commas).
//    The spec says "comma-separated integer list". But also "empty elements/whitespace ignored". 
//    Safest approach: Split by ',' then split strings to trim whitespace. Then parse each token.
// 3. Maintain a map[int64]bool for uniqueness? No, if we have duplicates in input like 1,2,2 -> Unique are {1,2}. Count=2 (number of unique items), Sum=3 (1+2). 
//    Wait, is "count" the count of UNIQUE numbers or total frequency?
//    If I say "For duplicate-removed integers... get count and sum", it usually means: Take the set {x | x in input}. Size of Set = Count. Sum(Set) = Sum.
//    
// 4. Output format exactly `count=<N> sum=<S>` with newline.

func main() {
	seen := make(map[int64]struct{}) // Acts as a Set to track unique integers
	
	var count int = 0
	sumBig := big.NewInt(0)
	
	reader := bufio.NewReader(os.Stdin)
	
	for {
		lineData, err := reader.ReadString('\n')
		if err != nil || lineData == "" && len(lineData) < 10? // Actually ReadString returns error on EOF. If line is just empty string after newline it might be fine to continue or break depending on input format. 
			break
		
		lineStr := strings.TrimRight(lineData, "\n")
		
		if lineStr == "" { continue }
		
		parts := strings.Split(lineStr, ",") // Split by comma
        
        for _, part := range parts {
            sPart := strings.TrimSpace(part)
            if sPart == "" { 
                continue 
            }
            
            val, err := strconv.ParseInt(sPart, 10, 64)
            if err != nil { 
                continue // Ignore non-integers as per spec "integer elements that cannot be interpreted" -> ignore them.
            }
            
            _, exists := seen[val]
            if !exists {
                count++
                sumBig.Add(sumBig, big.NewInt(val))
                seen[val] = struct{}{}
            }
        }
	}

	fmt.Println("count=" + strconv.Itoa(count) + " sum="+sumBig.String())


// Wait, I missed one thing. The problem says "standard input receives a comma-separated integer list". 
// It doesn't explicitly say multiple lines are allowed or that the whole input is ONE line. 
// But `reader.ReadString('\n')` handles multi-line inputs correctly (reads until newline).
// And if there's no final newline? ReadString might block if not EOF signaled properly, but in competitive programming context with file redirection, it works fine.
// To be absolutely safe against "no trailing newline" on the last line: 
// Use a loop that checks for EOF or uses `ReadBytes` until empty bytes are returned (which happens at EOF).

}
