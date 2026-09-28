package main

import (
	"bufio"
	"fmt"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	
	parts := strings.Split(s, ",")
	for i, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			return false
		}
		
		// Check if part is a valid integer
		var _ int64 // ignore result to avoid unused error, just check type safety conceptually
		fmt.Sscanf(part, "%d")
		
		// Additional check: ensure the string contains only digits and optionally a leading minus sign
		// Since we already scanned it successfully, we need to verify no non-digit chars were present in the original trimmed part
		if len(part) == 0 {
			return false
		}
		
		firstChar := part[0]
		if firstChar == '-' {
			if len(part) <= 1 || !isDigit(part[1]) {
				return false
			}
		} else {
			if !isDigit(firstChar) {
				return false
			}
		}
		
		for j := 1; j < len(part); j++ {
			if !isDigit(part[j]) {
				return false
			}
		}
	}
	
	return true
}

func isDigit(b byte) bool {
	return b >= '0' && b <= '9'
}

func main() {
	reader := bufio.NewReader(osStdin)
	lines := 0
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		if isValidLine(line) {
			lines++
		}
	}
	
	fmt.Printf("valid=%d\n", lines)
}

import (
	"os" // needed for osStdin in the main block logic above, though usually handled by environment
)
