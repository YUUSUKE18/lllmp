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
	var hasError bool
	for _, p := range parts {
		cleaned := strings.TrimSpace(p)
		if cleaned == "" || !isValidInteger(cleaned) {
			hasError = true
			break
		}
	}
	return !hasError
}

func isValidInteger(s string) bool {
	if s == "" {
		return false
	}
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0
	lineNum := 0

	for scanner.Scan() {
		lineNum++
		s := scanner.Text()
		if isValidLine(s) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
