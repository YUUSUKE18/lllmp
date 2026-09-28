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
		line, _ := scanner.Bytes()
		if len(line) == 0 {
			continue
		}

		cleanLine := strings.TrimSpace(string(line))
		if cleanLine == "" {
			continue
		}

		parts := strings.Split(cleanLine, ",")
		isValid := true

		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				isValid = false
				break
			}

			_, err := strconv.Atoi(part)
			if err != nil {
				isValid = false
				break
			}
		}

		if isValid {
			validCount++
		}
	}

	fmt.Fprintf(writer, "valid=%d\n", validCount)
}
