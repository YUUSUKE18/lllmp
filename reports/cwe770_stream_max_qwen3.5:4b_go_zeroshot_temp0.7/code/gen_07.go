package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		os.Exit(1)
	}

	var count int64 = 0
	maxValue := int64(-9223372036854775808 - 1) // Int64 min minus one to ensure any valid integer is larger initially, or handle first element separately. 
	// Actually, simpler approach: initialize max with the smallest possible value + a flag logic,
	// but since we just need max of existing elements, let's use a boolean flag for initialization.

	hasElement := false
	
	var parts []int64
	for _, part := range line {
		if part == ',' || part == ' ' || part == '\t' || part == '\n' {
			continue
		}
		
		valStr := string([]rune{part}) // This is wrong, need to iterate character by character carefully or use strings.Fields
        
		// Better parsing: split by comma and trim whitespace manually as per spec "空要素・前後の空白は無視" implies the whole line structure.
		// Re-reading spec: "標準入力から、カンマ区切りの整数列を受け取ります。" 
		// It doesn't explicitly say there's one line, but typically input is a single line or stream of tokens separated by comma/newline/whitespace.
		// The safest interpretation for competitive programming style inputs with commas: read token by token skipping non-digit/non-minus characters that aren't part of an integer? 
		// No, "整数として解釈できない要素も無視します" implies we parse what is valid int.
		
		// Let's use strings.Fields to get space separated tokens first if there are spaces around commas or multiple lines? 
		// The spec says "カンマ区切りの...". Usually means input like: 1,2 ,3
		// But it also allows ignoring invalid elements.
		
		// Robust approach: Read all text, split by comma (or whitespace), then try to parse each as int64. 
		// If parsing fails or element is empty string, ignore.
		
	}

	// Re-implementing logic inside main clearly
	
	var nums []int64
	for _, token := range strings.Fields(line) { // Fields splits by space/tab/newline but we need to handle commas too?
		// Spec says "comma-separated". 
		// Example: 1,2,3 or 1 , 2
		// If I use Fields on the whole line with comma included as delimiter is not standard.
		
		// Let's do a manual split by ',' then trim whitespace from each part.
	}

	// Final Plan:
	// 1. Split string by ','. 
	// 2. For each segment, strip leading/trailing spaces. If empty -> ignore. Else parse int64. Ignore if not valid (parse error).
	
	s := strings.Split(line, ",")
	for _, seg := range s {
		segs := strings.TrimSpace(seg)
		if len(segs) == 0 { continue } // Empty element ignored
		
		val, err := strconv.ParseInt(segs, 10, 64)
		if err != nil { 
			continue // Invalid integer interpretation -> ignore (e.g. "abc", or "- not a number")
		}
		
		nums = append(nums, val)
	}

	count = int64(len(nums))
	
	if count == 0 {
		fmt.Printf("count=%d max=0\n", count) // Spec doesn't define behavior for empty valid set. Usually undefined or specific handling required? 
											 // If no elements found after filtering, what is the max? 
											 // Logic dictates we can only find a maximum if there are elements.
											 // However, standard problem constraints usually imply at least one element exists in test cases unless specified "if count=0".
											 // Given "max=<最大値>", implies existence of value. If none exist, maybe 0 or minimal int64? 
											 // Let's assume if list is empty after filtering, we output max as the first valid number encountered logic doesn't apply.
											 // But wait, if input is just invalid chars -> count=0. What then?
											 // I will treat it as: if no numbers found, maybe print nothing or specific format? 
											 // Let's re-read carefully: "要素数と最大値を求めます". If 0 elements, max is undefined mathematically but in programming contests often handled by printing something like min_int64 or just following logic.
											 // Given the simplicity, I'll assume there is at least one valid integer if a meaningful answer is expected, OR handle empty set gracefully (e.g., print count=0 and maybe 0? Or skip?). 
											 // Let's stick to: calculate max from nums list. If empty, we can't determine max. But code must output something.
											 // I will initialize max with the first element logic. If loop doesn't run, what happens?
	} else {
		maxValue := int64(-9223372036854775808) 
		for _, n := range nums {
			if n > maxValue {
				maxValue = n
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
