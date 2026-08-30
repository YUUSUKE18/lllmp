package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(s string) bool {
	s = strings.TrimSpace(s)
	if s == "" {
		return false
	}
	parts := strings.Split(s, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			return false
		}
		_, err := fmt.Sscanf(part, "%d", nil)
		if err != nil {
			return false
		}
	}
	return true
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
