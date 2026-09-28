package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isDigit(r rune) bool {
	return r >= '0' && r <= '9'
}

func isValidLine(line string) bool {
	line = strings.TrimSpace(line)
	if len(line) == 0 {
		return false
	}

	for _, c := range line {
		if !isDigit(c) && c != ',' {
			return false
		}
	}

	parts := strings.Split(line, ",")
	numSeqCount := 0
	for _, part := range parts {
		if len(part) > 0 {
			numSeqCount++
		}
	}

	return numSeqCount >= 1
}

func main() {
	var validCount int
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		line := scanner.Text()
		if isValidLine(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
