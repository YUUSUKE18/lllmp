package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
    }
    
	parts := strings.Split(s, ",")
	if len(parts) == 0 {
		return false
    }

    for _, part := range parts {
        trimmedPart := strings.TrimSpace(part)
        if trimmedPart == "" {
            return false
        }
        
        val, err := strconv.Atoi(trimmedPart)
        if err != nil {
            return false
        }
        _ = val // unused but necessary for type correctness in this context
    }

    return true
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0

	for scanner.Scan() {
		if isValidLine(scanner.Text()) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
