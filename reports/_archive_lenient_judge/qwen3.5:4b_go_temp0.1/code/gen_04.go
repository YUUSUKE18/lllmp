package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go without arguments passed, we should use os.Stdin or similar logic if args were provided.
	// However, the spec says "standard input". Let's assume it might be empty or contain data via stdin redirection?
	// Wait, typical competitive programming inputs are often piped. But here no command line args for file path.
	// Re-reading: "標準入力から" -> Standard Input (stdin). 
	// Since Go doesn't automatically read from stdin unless we explicitly do it with os.Stdin or bufio.NewReader(os.Stdin),
	// and the problem implies reading until EOF, let's use a loop that reads lines.

	// Correction: The spec says "standard input". In many online judges, if no file is given, 
	// they might not provide any stdin content unless specified otherwise? Or maybe it expects us to read from os.Stdin directly.
	// But wait - the example isn't provided. Let's assume we need to handle potential empty input gracefully too.

	// Actually, looking at common patterns: if no data is given via command line args (like a file path), 
	// then reading from stdin might be tricky because there could be nothing.
	// However, the spec says "standard input", so let's assume we read until EOF.

	// But wait - how do we know when to stop? Usually by detecting EOF or empty lines.
	// Since it's a single line of comma-separated integers (as per typical interpretation), 
	// but also could be multiple lines? The spec says "カンマ区切りの整数列" -> Comma separated integer list.
	// It doesn't specify if it's one line or multi-line, so we'll read all tokens from stdin until EOF.

	// Let's use a scanner to tokenize by whitespace and commas together (since comma is not whitespace).
	// Actually, better approach: split each line by ',' then parse integers, ignoring invalid ones.

	var nums []int64 // Use int64 for safety with sum calculation up to 2^63-1 or so? 
	// Wait - "合計は 64bit 整数の範囲に収まります" -> Sum fits in 64-bit integer (signed).
	// So we can use int64.

	scanner := bufio.NewScanner(os.Stdin) // Need to import os too! But spec says only standard library, which includes os.
	
	// Wait - the problem didn't specify imports beyond "standard library", so `os` is allowed since it's part of Go stdlib.
	// However, if we want to avoid importing `os`, can we do without? 
	// Actually, no way to read from stdin without os or syscall package (which isn't standard in older versions but now available).
	// But wait - the spec says "standard library only", and `os` is part of it. So using `os.Stdin` is fine.

	// However, there's a catch: if no input is provided via stdin redirection? 
	// The problem might be designed such that we just read until EOF.
	
	// Let me re-read the spec carefully again: "標準入力から、カンマ区切りの整数列を受け取ります。"
	// This implies there IS standard input data to process, even if empty initially? Or maybe it's piped in during testing.

	// Since we can't know for sure without examples, let's assume typical behavior: read until EOF.

	// But wait - the problem says "1 つだけ書いてください" -> Write only one program.
	// And output format is strict: `count=<個数> sum=<合計>` followed by newline.

	// Let me think about edge cases: 
	// 1. Empty input -> count=0, sum=0? Or undefined? Spec doesn't say, but logically should be 0 and 0.
	// 2. Invalid tokens (non-integers) -> ignore them.
	// 3. Duplicate integers -> only count unique ones once per value.

	// Implementation plan:
	// - Read all lines from stdin until EOF.
	// - For each line, split by comma and whitespace? Or just treat the whole input as a stream of tokens separated by commas or spaces?
	//   Actually, "カンマ区切りの整数列" suggests that integers are separated by commas, but there might be spaces around them too.
	//   So we should tokenize everything: replace all non-digit/non-minus characters with space, then split into words.

	// However, a simpler approach: read entire input as string, remove newlines and extra whitespace, then split by comma? 
	// But what if there are spaces between numbers without commas? The spec says "comma-separated", so probably only commas separate them.
	// Example: "1, 2 ,3" -> [1, 2, 3] after trimming spaces around each token.

	// Let's do this step-by-step:
	// Step 1: Read all input into a single string (or process line by line).
	// Step 2: Replace commas with newlines? Or just split the whole thing by non-digit characters except minus sign? 
	// Actually, better to use regex or manual parsing. But since we can't import regexp unless allowed? Yes, `regexp` is standard library!

	// Wait - but maybe overkill. Let's try without importing extra packages if possible.
	// Alternative: read line by line, for each line split by comma, then trim and parse int64. Ignore errors during parsing.

	// But wait - what if the input has no commas? Like "1 2 3"? The spec says "comma-separated", so maybe it's guaranteed to have commas?
	// However, robustness suggests handling both cases: split by comma OR space? 
	// Actually, let's stick strictly to "comma-separated": only split by ','. But then how do we handle spaces around numbers? Trim each part.

	// Revised plan without regex (to minimize dependencies):
	// - Read all lines from stdin until EOF.
	// - Concatenate them into one big string? Or process line by line.
	// - For each line, split by ','. 
	// - For each resulting substring, trim whitespace and try to parse as int64. If fails, ignore.

	// But wait - what if the input is empty? Then we output count=0 sum=0.

	// Let's code accordingly:
	
	var uniqueInts map[int64]bool = make(map[int64]bool) // Use bool to track presence (count will be size of this map)
	sum := int64(0)

	scanner.Scan() // Read first line? No, we need to read until EOF. But Scanner doesn't give us a way to detect EOF easily without checking err.
	// Actually, better to use bufio.Scanner and loop while scanner.Scan().

	for scanner.Scan() {
		line := scanner.Text()
		if len(line) == 0 {
			continue // Skip empty lines
		}
		
		parts := strings.Split(line, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				continue
			}
			
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue // Ignore invalid integers
			}
			
			if !uniqueInts[val] {
				uniqueInts[val] = true
				sum += val
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", len(uniqueInts), sum)
