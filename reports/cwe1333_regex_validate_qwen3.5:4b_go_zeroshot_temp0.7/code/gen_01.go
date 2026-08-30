package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func validCSVLine(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}

	parts := strings.Split(line, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		if _, err := strconv.Atoi(part); err != nil {
			return false
		}
	}

	return true
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	validCount := 0

	for {
		line, err := reader.ReadString('\n')
		if err == io.EOF {
			break
		}
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error reading input: %v\n", err)
			os.Exit(1)
		}

		if validCSVLine(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
