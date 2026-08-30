package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	reader := bufio.NewReader(stdin)
	var seen map[int64] = nil

	for line, _ := reader.ReadString('\n') != "" {} // read all lines into a slice? No. Let's use strings.Split on the whole input or process line by line as specified: "comma-separated integers". Usually this means one long string potentially split across multiple lines in competitive programming contexts, but standard practice is often single-line unless stated otherwise. The spec says "standard input receives comma-separated integer sequence". Let's assume it can be multi-line if that makes sense, or just read all tokens until EOF. However, simpler approach: Read the entire buffer line by line and parse.

	// Actually, let's use a scanner to handle whitespace/newlines as separators regardless of commas?
	// Spec says "comma-separated". Let's stick strictly to comma separation but ignore extra chars/whitespace.
	
	scanner := bufio.NewScanner(reader) // This splits on space/tab/nl by default which is not what we want if input has no spaces and only commas. 
	// Better: Read entire file content? No, stream processing is safer for large inputs or interactive testing.

	// Let's re-read spec: "Standard Input receives comma-separated integer sequence".
	// We should parse until EOF.
	
	// To handle potentially weird input format (like spaces around commas), let's use a custom parsing loop reading byte by byte? Or just split on ',' and clean up. 
	// But Scanner with Delimiter is hard to make pure comma-only without regex. 
	// Let's read line by line, then split each line by ',', strip whitespace from parts, try parse int64.
	
	seen = map[int64]int{} // value -> count (actually we need sum and count per number? No: "about these unique integers". Wait.)

	// Re-read spec carefully: 
	// 『それらのうち『重複を除いた整数』について、個数と合計を求めます。』
	// Translation: For the [unique integers] among them, find [count] and [sum].
    // Does "unique" mean distinct? Yes. So if input is 1,2,1,3 -> unique are 1,2,3. 
    // Count = number of unique elements (which is count=number of UNIQUE items). Wait: 
    // Is it asking for sum/count per group or total/sum over all unique numbers?
    // Phrasing "重複を除いた整数" means the set S' = {x | x in input, distinct}.
    // Then about these (elements) find count and sum.
    // Likely: Count of such elements AND Sum of their values. 
    // If so, for 1,2,1,3 -> unique are {1, 2, 3} -> count=3, sum=6.

	// But wait, maybe it implies grouping? "For each occurrence" or just the set itself?
    // Given typical coding problem phrasing: 
    // Input: [a,b,c,a] -> Unique elements are {b,c}? No duplicate removal means distinct values present.
    // So if input has duplicates removed first -> we get a list of unique numbers. Then count and sum that list.

	// Let's proceed with this interpretation:
	// 1. Parse all integers from stdin, ignoring non-integer tokens (though spec implies valid comma separated ints).
	// 2. Store in a set to find unique ones? Actually just collect them if we encounter new numbers. 
    // But wait, if input is "1, 2 , 3", output should be count=3 sum=6.
    
	// Let's use big.Int for safety although int64 range says it fits in 64bit integer (meaning result won't overflow).

	var uniqueNumbers []int64
	count := int64(0)
	sumBig, _ := new(big.Int), nil // Start with zero? No, wait. 
	// Wait: sum accumulation starts at 0 initially if we find nothing? Or empty input -> count=0, sum=0?

    // Let's parse all lines until EOF.
    
	for {
		line, err := reader.ReadString('\n')
		if line == "" || err != nil && !scanner.Err() { 
			break 
		}
		
		// Split by comma and process parts
		parts := strings.Split(line, ",") // Wait: need import "strings"

        for _, p := range parts {
            s := string(p)
            if len(s) > 0 {
                trimmed := strings.TrimSpace(s)
                numStr := trimmed[1:] // Remove comma? No. 
                // Actually split by ',': each element is inside part. Trim spaces around it.
                
                val, err2 := strconv.ParseInt(trimmed, 10, 64)
                if !err2 {
                    uniqueNumbers = append(uniqueNumbers, val)
                } else {
                     continue // Ignore invalid integer elements per spec "integer as interpretable" - actually it says ignore those that cannot be interpreted. 
                }
            } else {
               continue
            }
        }

	}
	
    // Wait: My logic above collects ALL numbers found, then filters unique? No, the set itself is formed by removing duplicates from input sequence first.
    
    // Correct Logic:
    // 1. Parse all integers (ignoring non-integers). 
    // 2. Remove duplicates to form a list of UNIQUE values.
    // 3. Count = length of that unique list. Sum = sum of those elements.

	// Since Go has no Set type in stdlib without map, use map for deduplication or sort+uniq? Map is O(N) avg. Sort is NlogN but deterministic. Let's sort since we need to handle duplicates anyway if using sorting logic manually.
    
    // Actually simpler: Use a map[int64]bool as seen set while parsing and adding directly to uniqueNumbers list only once per value.

	var uniqueSet = make(map[int64]struct{}) 
	count := 0 
    
	for _, v := range values { // where `values` are parsed ints
	    if existing, ok := uniqueValues[v]; !ok {
	        count++
	        sumBig.Add(sumBig, big.NewInt(v))
	        uniqueSet = append(uniqueSet)
        }
    }

	// Wait: This logic is flawed because I haven't implemented the loop yet. Let's rewrite cleanly.

	var values []int64 // To store all parsed ints? Actually we can dedup on fly if we check existence before adding to list? No, map stores seen keys anyway.

	s := make(map[int64]bool)
	sumBig, _ = new(big.Int), nil
	
	// Parse loop again:
	var found bool
    
	for {
	    line, err := reader.ReadString('\n')
	    if len(line) == 0 || strings.HasPrefix(strings.TrimSpace(line), "") && strings.HasSuffix(strings.TrimSpace(line),"") { // Check EOF? No. 
	        break 
	    }
	    
	}

	// Wait: Scanner is not needed anymore since we use bufio directly and split on newline then comma. 

	var totalInts []int64
    
	for line, _ := reader.ReadString('\n'); ; "" {} ? No infinite loop logic error in my thought process above. Let's restructure cleanly with imports included here now.

import strings
// ... code below

	} // end of main?
