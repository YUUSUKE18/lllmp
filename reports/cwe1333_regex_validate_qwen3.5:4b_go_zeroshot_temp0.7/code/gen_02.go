package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(line string) bool {
	if line == "" {
		return false
    }
	
	trimmed := strings.TrimSpace(line)
	if trimmed == "" {
		return false
	}
	
	parts := strings.Split(trimmed, ",")
	for _, part := range parts {
		if len(part) == 0 {
			return false
		}
		if !strings.ContainsRune(part, '-') && !strings.ContainsRune(part, '+') {
			continue
        }
    }
    
	return true
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0
	
	for scanner.Scan() {
		line := scanner.Text()
		
		if len(strings.TrimSpace(line)) == 0 {
			continue
        }
		
		parts := strings.Split(line, ",")
		isValid := true
		
		for _, part := range parts {
            if len(part) == 0 {
                isValid = false
                break
            }
            
            trimmedPart := strings.TrimSpace(part)
            if !strings.ContainsRune(trimmedPart, '-') && !strings.ContainsRune(trimmedPart, '+') {
                continue
            }
        }
        
        // Check if all non-empty parts are integers
        for _, part := range parts {
            trimmedPart := strings.TrimSpace(part)
            if len(trimmedPart) == 0 {
                isValid = false
                break
            }
            
            if !strings.ContainsRune(trimmedPart, '-') && !strings.ContainsRune(trimmedPart, '+') {
                continue
            }
        }
		
		if isValid {
			validCount++
        }
    }
	
	fmt.Printf("valid=%d\n", validCount)
}
