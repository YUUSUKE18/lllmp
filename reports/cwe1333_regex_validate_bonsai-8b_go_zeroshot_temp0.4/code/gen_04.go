package main

import (
	"fmt"
	"strings"
	"unicode"
)

func isInteger(s string) bool {
	if s == "" {
		return false
	}
	for _, c := range s {
		if !unicode.IsDigit(c) && c != ',' {
			return false
		}
	}
	return true
}

func main() {
	var validLines []string
	input := strings.NewReader(os.Stdin)
	for input.Read() {
		line := strings.TrimSpace(input.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) >= 2 && allIntegers(parts) {
			validLines = append(validLines, line)
		}
	}
	fmt.Printf("valid=%d\n", len(validLines))
}

func allIntegers(parts []string) bool {
	for _, p := range parts {
		if p == "" {
			return false
		}
		if !isInteger(p) {
			return false
		}
	}
	return true
}
