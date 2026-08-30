package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
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

		cleanedLine := strings.TrimSpace(line)
		if cleanedLine == "" {
			continue
		}

		parts := strings.Split(cleanedLine, ",")
		if len(parts) == 0 {
			fmt.Fprintln(writer, "valid=0")
			return
		}

		validPart := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				validPart = false
				break
			}
			if _, err := strconv.Atoi(part); err != nil {
				validPart = false
				break
			}
		}

		if validPart {
			validCount++
		}
	}

	fmt.Fprintln(writer, "valid="+strconv.Itoa(validCount))
}
