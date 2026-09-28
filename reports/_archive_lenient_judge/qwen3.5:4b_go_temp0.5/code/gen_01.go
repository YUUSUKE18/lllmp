package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately if no input, but we need to read line first. Let's use standard io.ReadAll approach for a single line or multiple lines? The spec says "standard input receives...". Usually implies reading until EOF or one line. Given the context of competitive programming tasks often implied by such specs:

	// Read all stdin content
	content := ""
	if reader != nil { // If we pass nil to bufio.NewReader, it might fail if there's no data stream set up correctly in some environments, but standard practice is just reading from os.Stdin.
		
	}
	
	// Correct approach for Go: read from io.Reader (stdin) directly or use a scanner.
	// Let's implement robustly by reading all input at once as string tokens.
	data := []rune{} // We'll build this up
	
	// Actually, let's just use the standard way to read stdin in Go properly for CP style:
	// Read until EOF. But usually it's one line or multiple lines of comma separated values? 
	// Spec says "comma-separated integer sequence". It doesn't specify single line vs multi-line.
	// We'll assume input can span multiple lines, but the spec example suggests a list.
	
	// Let's create a simple loop to read all available characters from stdin into a string buffer first, then process.
	input := ""
	for {
		r, err := fmt.Fscanf(nil) // This won't work directly like that without proper reader setup. 
	}

	// The most robust way for "standard input" in Go is using bufio.Scanner or reading all bytes.
	// Let's use a scanner to read token by token (comma separated implies tokens are numbers).
	
	scanner := bufio.NewScanner(nil) // Again, need proper stdin reference? 
	// In local execution: os.Stdin. But here we simulate the environment where reader is available or just assume standard behavior.
	// Let's use a direct approach with bytes.NewReader from nil input if possible, but better to mimic typical CP solution.

	// Re-reading spec: "Standard input receives...". We'll read until EOF.
	
	// Correct implementation using os.Stdin (which is implicit in most Go programs unless redirected).
	// Since I cannot import 'os' directly without it being a standard lib, and the prompt says "standard library only", 
	// importing 'os' is allowed as it's part of stdlib. But let's try to avoid if possible? No, reading stdin requires os or bufio on io.Reader which wraps os.Stdin usually in tests.
	
	// Let's use a simple trick: read all input into a string via fmt.Fscanf with %s and loop until EOF? 
	// Or just assume the test harness provides data. The safest for "code generator" tasks is to write code that works when run as 'go main.go < input.txt'.
	
	// Let's use bufio.Scanner on nil reader -> it will panic if no source, so we must import os or handle carefully. 
	// Actually, in many online judges, the environment sets up stdin correctly. We can just read a line? Or all lines?
	// "comma-separated integer sequence" - likely one logical list. Let's assume input is one line for simplicity unless multi-line specified.
	// But to be safe against multiline: Read until EOF.

	// Since I cannot import 'os' explicitly in the code block without it being listed, but standard library includes os. 
	// Wait, "standard library only" means we CAN use packages from stdlib like fmt, bufio, math/big (though not needed), strings, sort etc.
	
	// Let's write a complete program that reads stdin properly.

	inputs := "" // Placeholder
	
	// We'll implement reading all input using bytes.Reader or similar to handle multiline safely if the judge sends multiple lines.
	// But simplest is: read line by line until EOF? Or just one big string? 
	// Let's assume single line for "sequence" but handle potential newlines as separators too (comma separated, whitespace ignored).
	
	// Actually, let's use a very simple approach that works regardless of input format slightly:
	// Read all bytes from stdin until EOF.
	
	var buf []byte = nil
	
	// To avoid 'os' import if not strictly necessary? No, reading stdin without os is hard unless we assume the environment injects data differently. 
	// But standard Go programs always use fmt.Scan or bufio.Scanner which read from io.Reader (stdin).
	// Let's try to just parse input directly using a custom loop over 'nil' reader if it simulates EOF? No, that won't work for real tests.
	
	// Okay, let's assume the environment sets up stdin correctly and we can use fmt.Fscan or similar which reads from os.Stdin by default in some contexts? 
	// Actually, fmt.Scanln reads from os.Stdin automatically! Yes. But it stops at newline if no args specified? No, Scan formats string based on format specifier.
	
	// Let's just read all input into a string using fmt.Fscanf with %s and loop until return is EOF? 
	// Or use bufio.Scanner which reads from os.Stdin by default when called like this: scanner := bufio.NewScanner(os.Stdin).
	// But I need to import 'os'. Is that allowed? "Standard library only" -> Yes, 'os' is part of standard library.
	
	import (
		"os" // Allowed as it's stdlib
	)

	var data []int
	
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" || len(line) == 0 {
			continue
		}
		
		// Split by comma or whitespace? Spec says "comma-separated". But also "whitespace ignored". 
		// So split on ',' and then trim spaces. If no ',', treat whole as string? Or maybe multiple numbers separated by commas only?
		// Usually CSV: 1,2,3 -> [1, 2, 3]. What about 1 , 2 ? Spaces around comma are ignored. 
		// Let's split on ',' and then parse each part trimming whitespace. If a number is not valid int (e.g., "abc"), ignore it.
		
		parts := []string{line} // Default to whole line if no commas? No, spec says comma separated.
		if idx := strings.Index(line, ","); idx != -1 {
			parts = splitByComma(line)
		} else {
			// If no comma, maybe it's a single number or invalid sequence? 
			// Let's assume if no comma, the whole string is one token (but might contain spaces?). 
			// Spec says "comma-separated". So likely there are commas. But let's handle non-comma case gracefully as well:
			parts = []string{line} // Treat entire line as potential tokens separated by space? Or just ignore if not comma?
			// Better to split on whitespace if no comma, but spec says "comma-separated". 
			// Let's assume input format is strictly 1,2,3 or similar. But robustness: split by ',' and then trim each part. If a part has spaces inside like " 5 ", it becomes 5.
			// What if there are multiple numbers without commas? The spec says "comma-separated integer sequence". 
			// So we expect commas. Let's stick to splitting by comma. If no comma, maybe the line is just one number or garbage? 
			// But wait, what if input is: 10,20 30 ? (spaces instead of comma?) Spec says "comma-separated". We should probably only split on ','.
			// However, to be safe against "whitespace ignored", maybe we can replace commas with spaces and then tokenize? 
			// Let's do: Replace ',' with space. Then use strings.Fields(). This handles both cases (1,2 -> 1 2; 1 , 2 -> 1   2).
			
			line = strings.ReplaceAll(line, ",", " ")
			parts = strings.Fields(line) // Now split by whitespace automatically ignoring empty tokens and spaces.
		}

		for _, token := range parts {
			val, err := strconv.Atoi(token)
			if err != nil {
				continue // Ignore non-integer elements (e.g., "abc")
			}
			data = append(data, val)
		}
	}

	// Now data contains all valid integers. We need: count of unique values and sum of ALL values? 
	// Spec says: "『重複を除いた整数』について、個数と合計を求めます。" -> "For the [integers without duplicates], find the count and total."
	// Does this mean: Count = number of unique integers. Sum = sum of these unique integers (i.e., sum of distinct values)? 
	// Or does it mean: For each integer in the original list, if we remove duplicates from the set, what is its count? No.
	// Interpretation A: Find the size of the set and the sum of elements in that set.
	 // Example: Input 1, 2, 1 -> Unique: {1, 2}. Count=2. Sum=3.
	 // This seems most logical for "sum of integers after removing duplicates". 
	// If it meant "count occurrences and sum all original", it would say "for each integer... count its occurrence". But it says "for the [unique] integers".
	
	sort.Slice(data, func(i, j int) bool { return data[i] < data[j] }) // Sort to process
	
	distinct := make(map[int]bool)
	sumVal := 0
	
	for _, v := range distinctMapFromData(data) { 
		if !distinct[v] {
			distinct[v] = true
			sumVal += v
		}
	}

	fmt.Printf("count=%d sum=%d\n", len(distinct), sumVal) // Wait, I haven't implemented map from data yet. Let's fix logic inline.
	
	// Re-implementation of distinct set:
	distinctSet := make(map[int]bool)
	sumTotal := 0
	
	for _, v := range data {
		if !distinctSet[v] {
			distinctSet[v] = true
			sumTotal += v // Sum only unique values? Or sum all original then divide by count of duplicates? 
			// Spec: "『重複を除いた整数』について、個数と合計を求めます。" -> For the [unique integers], find count and total.
			// So if input is 1,2,3,1, unique are {1,2,3}. Count=3. Sum = 1+2+3 = 6. 
			// It does NOT say "sum of all elements". It says sum OF the [unique integers].
			
		} else if distinctSet[v] && v != -999 // Just to avoid double counting in loop? No, we only add when !distinctSet[v].
	}

	fmt.Printf("count=%d sum=%d\n", len(distinctSet), sumTotal)
