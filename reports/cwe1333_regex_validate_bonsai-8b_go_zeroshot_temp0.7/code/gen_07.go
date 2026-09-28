package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(line string) bool {
	line = strings.TrimSpace(line)
	if len(line) == 0 {
		return false
	}
	parts := strings.Split(line, ",")
	if len(parts) < 2 {
		return false
	}
	for _, part := range parts {
		if part == "" {
			return false
		}
		if !isInteger(part) {
			return false
		}
	}
	return true
}

func isInteger(s string) bool {
	if len(s) == 0 {
		return false
	}
	if s[0] != '-' && s[0] != '+' {
		return false
	}
	for _, c := range s[1:] {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var validLines []string
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if isValidLine(line) {
			validLines = append(validLines, line)
		}
		if scanner.Err() {
			break
		}
	}
	fmt.Printf("valid=%d\n", len(validLines))
}
