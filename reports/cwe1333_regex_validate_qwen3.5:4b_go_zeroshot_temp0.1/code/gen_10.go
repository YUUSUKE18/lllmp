package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := os.Stdout

	validCount := 0
	scanner := bufio.NewScanner(reader)

	for scanner.Scan() {
		line, _ := scanner.Text()
		if line == "" {
			continue
		}
		cleaned := strings.TrimSpace(line)
		if cleaned == "" {
			continue
		}

		parts := strings.Split(cleaned, ",")
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				break
			}
			if _, err := fmt.Sscanf(part, "%d", nil); err != nil {
				validCount--
				break
			}
		}

		if validCount > 0 {
			fmt.Fprintf(writer, "valid=%d\n", validCount)
		}
	}

	if scanner.Err() != nil {
		os.Exit(1)
	}
}
