package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func validLine(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}
	parts := strings.Split(line, ",")
	validPartCount := 0
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		if _, err := strconv.Atoi(part); err != nil {
			return false
		}
		validPartCount++
	}
	return validPartCount > 0
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	validCount := 0
	for scanner.Scan() {
		if validLine(scanner.Text()) {
			validCount++
		}
	}
	fmt.Printf("valid=%d\n", validCount)
}
