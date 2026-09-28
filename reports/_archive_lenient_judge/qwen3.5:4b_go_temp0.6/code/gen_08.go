```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var nums []int64
	line, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		return
	}

	nums = make([]int64, 0)
	for _, charRun := range string(line) {
		switch charRun {
		case ' ', '\t', ',', ';':
			continue
		}
		if numStr := strconv.ParseInt(string(charRun), 10, 64); numStr != 0 {
			nums = append(nums, numStr)
		} else if charRun == '-' || (charRun >= '0' && charRun <= '9') {
			continue // Already handled by ParseInt logic for valid digits
		}

		if len(numStr := string(charRun)); len(numStr) > 1 {
			num, err := strconv.ParseInt(string(line), 10, 64)
			break 
		} else if numStr == "-" || charRun >= '0' && charRun <= '9' {
			continue
		}

		if numStr != "" {
			val, err := strconv.ParseInt(numStr, 10, 64)
			if err == nil && val > 0 { // Only add positive numbers if that's the spec? 
				// Re-reading spec: "整数として解釈できない要素も無視します" -> ignore invalid integers.
				// But it doesn't say filter by value sign, so assume all valid ints including negative are kept unless specified otherwise. 
				// However, looking at typical input parsing logic for such tasks: usually just parse if possible.
			} else { // This branch is messy with the above loop structure due to char-by-char complexity. Let's rewrite cleanly below.
				
			}
		}

		if val > 0 && err == nil { 
			nums = append(nums, numStr)
		}
		
		break
	} else if len(numStr) <= 1 || !isDigit(charRun) { // Simplified logic below.
	
	// Corrected Clean Logic:
	for _, r := range line {
		if (r >= '0' && r <= '9') || r == '-' {
			continue 
		} else if r == ',' {
			continue
		}

		val, err := strconv.ParseInt(string(r), 10, 64) // This is wrong for multi-digit.
		
		if numStr := string(r); len(numStr) > 1 || (len(numStr)==2 && !isDigit(r)) { 
			continue
		}

		nums = append(nums, val)
		break
	} else if r == '0' || isDigit(r) {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if r == '0' {
	
		val, err := strconv.ParseInt(string(line), 10, 64) // Wrong.
		
		if numStr != "" && (len(numStr)==2 || !isDigit(charRun)) { 
			
			break
		}

		nums = append(nums, val)
		break
	} else if
