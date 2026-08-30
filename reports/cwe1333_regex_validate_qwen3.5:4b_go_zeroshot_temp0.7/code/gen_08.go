package main

import (
	"bufio"
	"fmt"
	"regexp"
	"strings"
)

func isValidLine(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}

	pattern := regexp.MustCompile(`^\s*(\d+(,\s*\d+)*|,?\s*)$`)
	if !pattern.MatchString(line) {
		return false
	}

	parts := strings.Split(line, ",")
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
	count := 0

	for scanner.Scan() {
		line := scanner.Text()
		if isValidLine(line) {
			count++
		}
	}

	fmt.Printf("valid=%d\n", count)
}
