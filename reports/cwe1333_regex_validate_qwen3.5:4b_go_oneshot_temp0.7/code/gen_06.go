package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(line string) bool {
	stripped := strings.TrimSpace(line)
	if stripped == "" {
		return false
	}

	parts := strings.Split(stripped, ",")
	for _, part := range parts {
		if part == "" {
			return false
		}
		_, err := fmt.Sscanf(part, "%d")
		if err != nil {
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
