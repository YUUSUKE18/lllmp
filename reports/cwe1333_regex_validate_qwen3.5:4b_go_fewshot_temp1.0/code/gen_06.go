package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isLineValid(line string) bool {
	line = strings.TrimSpace(line)
	if line == "" {
		return false
	}
	parts := strings.Split(line, ",")
	if len(parts) == 0 {
		return false
	}

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			return false
		}
		n, err := strconv.Atoi(part)
		if err != nil {
			return false
		}
	}
	return true
}

func main() {
	sc := bufio.NewScanner(os.Stdin)
	validCount := 0

	for sc.Scan() {
		line := sc.Text()
		if isLineValid(line) {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
