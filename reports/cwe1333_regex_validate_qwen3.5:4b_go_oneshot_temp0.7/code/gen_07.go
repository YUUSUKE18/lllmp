package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0
	isFirst := true

	for sc.Scan() {
		line := sc.Text()
		lines, err := strings.CutPrefix(line, "\n")
		if len(lines) > 1 {
			continue
		}
		cleanedLine := strings.TrimSpace(strings.ReplaceAll(lines, " ", ""))
		
		if cleanedLine == "" {
			continue
		}

		parts := strings.Split(cleanedLine, ",")
		validParts := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if len(part) == 0 || !isNumeric(part) {
				validParts = false
				break
			}
		}

		if validParts {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}

func isNumeric(s string) bool {
	for _, r := range s {
		if r < '0' || r > '9' {
			return false
		}
	}
	return true
}
