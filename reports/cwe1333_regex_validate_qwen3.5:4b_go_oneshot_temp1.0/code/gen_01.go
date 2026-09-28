package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if len(s) == 0 {
		return false
	}

	parts := strings.Split(s, ",")
	
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || (len(part) > 0 && !isDigitString(part)) {
			return false
		}
	}
	return true
}

func isDigitString(s string) bool {
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0

	for sc.Scan() {
		line := sc.Text()
		if isValidLine(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
