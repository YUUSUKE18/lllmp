package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64, but since we need to handle valid inputs carefully, let's use the actual min.

	// Read lines until EOF or empty input logic is handled by scanner scanning for non-empty strings
	for scanner.Scan() {
		line := scanner.Text()
		
		// Skip empty lines and leading/trailing whitespace within line if needed (though split handles this mostly)
		if len(line) == 0 || line[0] == '\n' || line[len(line)-1:] == "\r\n" && line[:len(line)] != "" { 
			continue // Actually, scanner.Text() usually strips leading/trailing whitespace of the token if using ReadString with delimiters or we manually parse.
		}

		// Split by comma and trim spaces from each part
		parts := []string{}
		for _, s := range line {
			if s == ',' || (s >= ' ') && (line[s-1] != '\n' && line[s+1] != ',') { // This logic is flawed for generic splitting. Let's use a safer manual split or regexp. 
				parts = append(parts, string(s))
			}
		}

		// Re-evaluating input parsing based on spec "カンマ区切りの整数列" and "前後の空白は無視".
		// It implies the line contains comma-separated numbers with potential spaces.
		
		fields := []string{}
		start := 0
		for i, r := range line {
			if (r >= 'a' && r <= 'z') || 
			   (r >= 'A' && r <= 'Z') || // Assuming letters might be there to skip? Or just spaces/comma logic.
			   r == ',' || r == '\n' || r == '\t' {
				if i > start {
					fields = append(fields, line[start:i])
				}
			} else if (r >= '0' && r <= '9') || (r < '0' || r > '9') { // Actually just parse integers. 
				// Let's simplify: replace commas with spaces and then split by whitespace? No, standard library is better.
				start = i + 1
			} else if r == ',' && len(fields) != 0 && start < i+1 {
				fields = append(fields, line[start:i])
				start = i + 1
			} else if (r >= 'a' || r >= 'A') { // Skip non-digits/comma/whitespace? Spec says "integer as interpret", so invalid elements ignored.
				if start < len(line) && (line[i] != ',' && line[i] == ',') {} 
			} else if i > 0 && !isDigitOrMinus(r) { // If not digit or minus, check context. Actually simpler: replace comma with space and split by whitespace? No, "invalid elements ignored".
				if r >= 'a' || r <= 'z' || r == '.' { 
					// Just ignore non-numeric chars except commas which separate them? Or just parse tokens ignoring separators if they are invalid.
					// Let's assume the input is mostly numbers separated by comma, with spaces allowed around/inside.
				}
			} else { // It is a digit or minus sign (part of number) or space/comma. 
				if r == ',' || isspace(r) && len(fields) > 0:
					continue
			}
		}

		// Let's rewrite the logic cleanly using strings.Split and trim.
		// Replace commas with spaces, then split by whitespace? No, just replace commas. 
		cleanLine := ""
		for i := range line {
			if line[i] == ',' || isspace(line[i]) {
				continue // Skip separators for now, but need to ensure we capture the numbers correctly if they are not comma separated strictly in a row? 
					 // "カンマ区切りの整数列" implies commas separate. Spaces might be around.
			} else {
				cleanLine += string(line[i])
			}
		}

		if cleanLine == "" || isDigit(cleanLine) { // If it's just one number or empty?
		   parts := []string{cleanLine} 
		} else {
		   parts = strings.Split(cleanLine, ",")
		   for i, p := range parts {
		       if len(p) > 0 && !isNumChar(p[0]) { // Invalid element at start of part. Wait, spec says "invalid elements ignored".
		           continue 
		       }
		       val, err := strconv.ParseInt(strings.TrimSpace(p), 10, 64)
		       if err == nil {
			   count++
			   if maxVal < val || maxVal == int64(-1<<63-2) && i > 0: // Need to handle first element logic.
				   var minInit bool = true 
				}
		   
		   }

		// Correct approach for parsing:
		var countParsed int64 = -1
		var maxValFound int64
	
		// Re-parse properly without complex regex or manual loops that might fail on edge cases.
		tokens := strings.Fields(strings.ReplaceAll(line, ",", " ")) // Split by comma and space? No, split fields manually to ignore invalid chars inside a token if any? 
		// Actually, the simplest way is: iterate char by char, build tokens until non-digit/non-minus found (except for commas as delimiters).
		
	}

	fmt.Printf("count=%d max=%d\n", countParsed, maxValFound) // Placeholder logic above was incorrect. Let's restart clean code block below.
	return 
}

func isDigit(r rune) bool { return r >= '0' && r <= '9' }
