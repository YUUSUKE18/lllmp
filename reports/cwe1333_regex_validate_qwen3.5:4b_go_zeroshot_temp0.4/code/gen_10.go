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
	
	var lastWasDigit bool
	for _, c := range s {
		if c >= '0' && c <= '9' {
			lastWasDigit = true
		} else if c == ',' {
			if !lastWasDigit {
				return false
			}
		} else {
			return false
		}
	}
	
	return lastWasDigit
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0
	
	for scanner.Scan() {
		line := scanner.Text()
		if isValidLine(line) {
			validCount++
		}
	}
	
	fmt.Printf("valid=%d\n", validCount)
}
