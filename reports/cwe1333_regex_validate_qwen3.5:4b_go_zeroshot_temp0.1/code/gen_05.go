package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isCommaSeparatedIntegers(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}

	parts := strings.Split(line, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			return false
		}
		_, err := strconv.Atoi(part)
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
		if isCommaSeparatedIntegers(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
