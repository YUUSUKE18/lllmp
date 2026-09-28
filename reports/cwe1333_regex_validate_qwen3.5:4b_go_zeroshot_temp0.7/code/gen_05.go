package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(osStdin)
	validCount := 0
	scanner := bufio.NewScanner(reader)
	lineIndex := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())

		if line == "" {
			continue
		}

		parts := strings.Split(line, ",")
		if len(parts) == 0 {
			continue
		}

		validLine := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				validLine = false
				break
			}

			value, err := strconv.Atoi(part)
			if err != nil {
				validLine = false
				break
			}
		}

		if validLine {
			validCount++
			lineIndex++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
