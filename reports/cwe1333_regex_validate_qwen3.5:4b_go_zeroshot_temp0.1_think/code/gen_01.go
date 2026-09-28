package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	var validCount int
	reader := bufio.NewReader(os.Stdin)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			// If EOF is reached without finding a newline, process the last line
			if line == "" && err == bufio.ErrEOF {
				break
			}
			// Process the last line if it exists (even without newline)
			processLine(line)
			break
		}
		processLine(line)
	}

	fmt.Printf("valid=%d\n", validCount)
}

func processLine(line string) {
	trimmed := strings.TrimSpace(line)

	// Empty line after trim is invalid
	if len(trimmed) == 0 {
		return
	}

	// Check if all characters are digits or commas
	for _, ch := range trimmed {
		if !isDigit(ch) && ch != ',' {
			return
		}
	}

	// Check if there is at least one digit sequence (at least one digit)
	hasDigit := false
	for _, ch := range trimmed {
		if isDigit(ch) {
			hasDigit = true
			break
		}
	}

	if hasDigit {
		validCount++
	}
}

func isDigit(ch rune) bool {
	return ch >= '0' && ch <= '9'
}
