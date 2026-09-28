package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for stdin in Go without arguments passed, we read from os.Stdin directly or use a scanner on it.
	// Let's rewrite the reading part correctly using fmt.Scanln which handles whitespace skipping automatically.

	var tokens []string
	
	// Read all lines until EOF? The spec says "standard input". 
	// Usually in competitive programming contexts with Go, we read line by line or token by token.
	// Since it's a comma-separated list potentially spanning multiple lines (though not specified),
	// reading the entire stdin as one string and splitting is safer for whitespace handling if needed,
	// but fmt.Scanln reads until newline. 
	// Let's assume standard input might contain newlines or just be one line.
	
	// A robust way to read all tokens from stdin:
	scanner := bufio.NewScanner(fmt.Fd(0)) // This doesn't work directly like that for reading stream easily without a loop.
	// Better approach: Read everything into memory if possible, then split by comma and whitespace.
	
	inputData, err := fmt.Scan() 
	if inputData == nil {
		return
	}

	// Actually, the simplest way to read "all input" in Go for such problems is often reading line by line or using a custom reader loop.
	// However, since we don't know if it's one line or multiple lines with newlines acting as separators (which are whitespace),
	// let's use fmt.Scanf repeatedly until EOF? No, that requires knowing the count.
	
	// Let's try reading all input into a string first using os.Stdin directly via bufio.Scanner in a loop.
	scanner = bufio.NewScanner(nil) // This is invalid for stdin without source. 
	// Correct way: scanner := bufio.NewReader(os.Stdin); but we can't import os if restricted to standard library? 
	// fmt package doesn't give access to raw bytes easily unless we use io.ReadAll on a reader created from os.Stdin,
	// which requires 'os' package. The spec says "standard library only", so 'os' is allowed as it's part of stdlib.

	import (
		"bufio"
		"fmt"
		"os"
	)

	reader := bufio.NewReader(os.Stdin)
	
	var allTokens []string
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break // EOF reached
		}
		
		// Split line by comma and trim whitespace from each part
		parts := splitByComma(line)
		allTokens = append(allTokens, parts...)
	}

	counts := make(map[int]int64)
	sumBig := big.NewInt(0) // Use big.Int to prevent overflow during accumulation before final check? 
	// Spec says "sum fits in 64bit integer range". So we can use int64 directly if careful, but intermediate sums might exceed.
	// However, since the result MUST fit in 64-bit, and inputs are integers (assumed within reasonable bounds for sum to fit),
	// using big.Int is safer during accumulation then converting back or just checking at end? 
	// Actually, simpler: accumulate into int64. If it overflows, that would violate the spec "sum fits in 64bit".
	// But if inputs are large negative/positive numbers such that sum exceeds 2^63-1 but is within valid range? No, "fits" means <= max and >= min.
	
	var totalSum int64 = 0
	
	for _, token := range allTokens {
		token = strings.TrimSpace(token) // Wait, need to import 'strings' too. 
		if len(strings.Split(token, ",")) > 1 || (len(token) == 2 && token[0] != ',' && token[len(token)-1] != ',') {
			// This logic is getting messy because I'm mixing imports mentally. Let's restart the code block cleanly with correct imports.
			
			// Re-evaluating: 
			// Input format: comma-separated integers. Whitespace ignored. Invalid elements ignored.
			// So split by ',' then trim each part, try parse int. If fail, ignore.
			
			parts := strings.Split(token, ",") // Wait, the input is a list of numbers separated by commas? 
			// "カンマ区切りの整数列" -> Comma-separated integer sequence.
			// Example: 1,2,3 or 1 , 2 , 3 ? Or just comma delimited string like "10,20,30"?
			// Usually it's a single line like "1, 2, 3". 
			
			// Let's assume the input is one or more lines containing numbers separated by commas.
			// We need to split every token (from each line) by comma? Or just treat the whole stream as tokens separated by ',' and whitespace?
			// "カンマ区切りの整数列" implies structure: num, num, num...
			
			// Let's refine the parsing logic inside main.
		}
		
		// Correct Logic Flow:
		// 1. Read all input lines from stdin.
		// 2. For each line, split by comma to get potential number strings.
		// 3. Trim whitespace from each string.
		// 4. Try parse as int64. If success, add to map and sum. Ignore if fail (invalid integer).
		
	}

	fmt.Println(fmt.Sprintf("count=%d sum=%d", len(counts), totalSum)) // Wait, need unique count? "重複を除いた整数" -> Unique integers.
	
	// Correct logic:
	uniqueNumbers := make(map[int64]bool)
	sumBigInt := big.NewInt(0)

	for _, tokenStr := range allTokens {
		tokenStr = strings.TrimSpace(tokenStr) // Wait, if I split by comma first? 
		// Let's restructure the parsing loop.
		
	}
	
	fmt.Println(fmt.Sprintf("count=%d sum=%d", len(uniqueNumbers), totalSum))
