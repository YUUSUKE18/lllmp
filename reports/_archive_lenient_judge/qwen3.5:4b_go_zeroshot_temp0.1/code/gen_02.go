package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately for empty input, but we need to handle stdin properly. 
	// Actually, standard practice is just reading from os.Stdin directly or using a scanner that handles the stream.
	// Let's use fmt.Fscan which reads until it hits an error (EOF).

	var nums []int
	
	// Read all integers from stdin separated by whitespace/newlines/comma
	// We can't easily do "comma-separated" with just Fscanf in one go without a loop, 
	// but the problem says "standard input receives comma-separated integer list".
	// Usually this means we read lines or tokens. Let's assume standard tokenization (whitespace and newlines are delimiters).
	// The prompt mentions "comma-separated", so let's handle commas as well if they appear, 
	// but typically in competitive programming contexts with Go, whitespace is the delimiter unless specified otherwise for parsing logic.
	// However, to be safe regarding "comma-separated": we can read line by line and split by comma or space.
	
	scanner := bufio.NewScanner(reader) // Wait, I need a real reader instance if not nil? 
	// Actually, let's just use fmt.Fscan with %d which skips whitespace automatically. If commas are present without spaces (e.g., "1,2"), Fscanf might fail unless we handle it.
	// Better approach: Read all input into a string or process line by line splitting by non-digit characters? 
	// No, the simplest robust way for Go is to read tokens manually if specific delimiters are needed, but standard %d skips whitespace.
	// If the input is "1,2", Fscanf("%d") will fail on ','. So we need a custom parser or replace commas with spaces first?
	// Or just use strings.FieldsFunc which allows defining delimiter function.
	
	input := "" // We can't read all into memory easily without knowing size, but let's assume it fits in reasonable bounds for this task type. 
	// Actually, reading line by line is safer and handles large inputs better than loading everything if not needed immediately? 
	// But we need to process the whole set of numbers first (to count unique ones).
	
	// Let's use a simple loop with bufio.Scanner which splits on whitespace by default. 
	// To handle commas, we can preprocess or just assume standard input format usually implies tokens separated by any non-digit? 
	// The spec says "comma-separated integer list". Example: 1,2,3
	// If I do `fmt.Fscan` with `%d`, it stops at comma. So let's implement a custom token reader that handles commas and spaces as delimiters.
	
	scanner = bufio.NewScanner(bufio.NewReader(nil)) // This is wrong for reading from stdin in this context if not passed correctly? 
	// Wait, I need to read FROM standard input (os.Stdin). The prompt says "standard input".
	// So: reader := bufio.NewReader(os.Stdin) -> but os isn't imported. Use fmt.Fscan with a custom delimiter logic or just assume the user provides valid tokens separated by space/newline/comma? 
	// Actually, `fmt.Sscanf` doesn't exist for reading all at once easily without format string issues if commas are present.
	
	// Let's use strings.Split on lines and then split each line by comma/space.
	// But we don't have the whole input in memory yet unless we read it. 
	// Since Go has no built-in "read until EOF" that returns a single string easily without buffering, let's do:
	
	var tokens []string
	
	scanner = bufio.NewScanner(bufio.NewReader(nil)) // Still need os.Stdin? No, I can't import os if not allowed? 
	// Wait, standard library includes `os`. Yes. But the prompt says "standard library only". So `import "os"` is fine.
	
	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" && len(line) > 0 { // Handle EOF or empty lines? 
			break 
		}
		// Remove carriage return if present (Windows style)
		line = strings.TrimRight(line, "\r")
		
		// Split by comma and space manually to be safe. Or just replace non-digit chars with spaces?
		// "1,2" -> split by ',' gives ["1", "2"]
		// Let's use a simple regex-like approach or manual parsing since we can't import regexp easily without overhead? 
		// Actually `strings.Split` works on specific delimiters. We need to handle both comma and space/newline as separators between numbers.
		
		// Simpler: Replace all non-digit characters (except minus sign) with spaces, then split by whitespace.
		cleaned := strings.ReplaceAll(line, ",", " ") // Handle commas specifically mentioned in spec? 
		// What about other delimiters? Spec says "comma-separated". It implies the main delimiter is comma. But usually space/newline are also separators.
		// Let's assume input like: 10,20,30 or 10 , 20 .
		
		parts := strings.FieldsFunc(line, func(r rune) bool { return !strings.ContainsRune(" \t\n\r,", r) }) // Wait, this keeps digits and minus. 
		// Actually `strings.Fields` splits by whitespace only. We need to split by comma too if no space exists?
		
		// Let's try a different approach: Read all input into one string first using bufio.Scanner with custom delimiter or just read line by line and join them, then process the whole text as a stream of numbers separated by non-digit chars (except -).
		
	} 
	// Re-evaluating strategy to avoid complex imports if possible.
	
	// Let's use `fmt.Fscan` but we need to handle commas. 
	// If input is "1,2", Fscanf("%d") fails on ','. 
	// So let's read the entire stdin content into a string first? No, that might be memory heavy for huge inputs (though spec says sum fits in 64bit int, implying reasonable count).
	
	// Let's use `bufio.Scanner` with default whitespace delimiter and manually handle commas by replacing them during reading or preprocessing.
	// Actually, the easiest way to parse "1,2" is to replace ',' with ' '. 
	// But we need to read line by line because stdin might be large? No, let's assume it fits in memory for this exercise.
	
	// Correct Plan:
	// 1. Read all lines from os.Stdin into a single string (or process stream).
	// 2. Replace ',' with ' '.
	// 3. Split by whitespace to get tokens.
	// 4. Parse each token as int, ignoring invalid ones? Spec says "ignore elements that cannot be interpreted as integers". 
	//    So if a line has garbage text like "abc", we should skip it.
	
	// Let's implement reading all lines and joining them into one big string to simplify splitting logic (replace comma with space).
	var content strings.Builder // Wait, no import for strings? Yes `strings` is standard lib.
	
	reader = bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n')
		if err != nil || line == "" && len(line) > 0 { 
			break 
		}
		content.WriteString(strings.TrimSpace(line)) // Trim newline and spaces? No, keep internal structure but remove newlines.
	}
	
	// Now content has all input without newlines (except maybe trailing). Replace commas with space.
	s := strings.ReplaceAll(content.String(), ",", " ") 
	tokens := strings.Fields(s) 
	
	var uniqueMap map[int]bool = make(map[int]bool) // To track seen numbers? No, we need count of UNIQUE integers and their sum.
	// Wait: "重複を除いた整数" -> Unique integers. Count how many unique ones there are? And what is the sum of those unique ones? 
	// Example input: 1,2,3,2,4 -> Unique: {1,2,3,4}. Count=4. Sum=1+2+3+4=10.
	
	var seen = make(map[int]bool) // Use bool map to track existence of each unique number. 
	// Actually we need the sum of these unique numbers. So iterate through valid integers found in input:
	// If a number hasn't been seen, add it to set and add to totalSum. Increment count if not already counted? 
	// Wait, "個数" (count) refers to the number of UNIQUE elements. "合計" (sum) is sum of those unique elements.
	
	totalCount := 0
	var totalSum int64 = 0
	
	for _, token := range tokens {
		val, err := strconv.Atoi(token) // Wait, need import `strconv`. Yes standard lib.
		if err != nil { 
			continue // Ignore invalid integers (e.g., "abc")
		}
		
		if !seen[val] {
			totalCount++
			totalSum += int64(val)
			seen[val] = true
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum) // Wait, spec says "sum=<合計>". Is it string formatting? Yes. 
	// Spec: `count=<個数> sum=<合計>` -> count=4 sum=10
	
	// One issue: The prompt says "standard input receives comma-separated integer list".
	// My logic handles commas by replacing with space, which is correct for parsing integers separated by any non-digit.
	
}
