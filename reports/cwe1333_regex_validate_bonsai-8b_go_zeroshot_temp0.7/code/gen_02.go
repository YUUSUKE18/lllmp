package main

import (
	"fmt"
	"strings"
)

func main() {
	var validLines []string

	for {
		if !readLine(&validLines) {
			break
		}

		line := strings.TrimSpace(validLines[len(validLines)-1])
		if len(line) == 0 {
			continue
		}

		parts := strings.Split(line, ",")
		if len(parts) > 1 {
			validLines = append(validLines, line)
		}
	}

	if len(validLines) > 0 {
		fmt.Printf("valid=%d\n", len(validLines))
	} else {
		fmt.Println("valid=0")
	}
}

func readLine(lines []string) bool {
	if len(lines) == 0 {
		return false
	}

	next := lines[len(lines)-1]
	lines = lines[:len(lines)-1]

	for {
		if next == "" {
			return false
		}
		if next == "\n" {
			return true
		}
		next = strings.TrimSpace(strings.NewReader(next).Read())
	}
}
