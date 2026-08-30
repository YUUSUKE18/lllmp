package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func isValidLine(line string) bool {
	s := strings.TrimSpace(line)
	if s == "" {
		return false
	}

	parts := strings.Split(s, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part != "" {
			if _, err := fmt.Sscanf(part, "%d", nil); err != nil {
				return false
			}
		}
	}
	return true
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	validCount := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if isValidLine(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
